import type { ConfigModuleOptions } from '@nestjs/config';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Params } from 'nestjs-pino';

import { RequestMethod } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { LogLevel, NodeEnv } from '@/master/shared/enums';

import { AppController } from './app.controller';
import * as Joi from 'joi'; // 注意：不能转为默认导入

/**
 * @description 应用程序配置类，用于生成 Fastify 实例和配置对象。
 */

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export  class AppConfig {

  /**
   * @description 生成一个 Fastify 实例。
   * @returns {FastifyAdapter}
   */
  public static getFastifyInstance(): FastifyAdapter {
    return new FastifyAdapter();
  }
/**
 * @description 生成一个配置对象，其中包含全局配置和验证模式。
 */
public static getInitConifg(): ConfigModuleOptions {
    const validLogLevelList = Object.keys(LogLevel).map((key) => LogLevel[key]);
    const validNodeEnvList = Object.keys(NodeEnv).map((key) => NodeEnv[key]);

    return {
      isGlobal: true,
      validationSchema: Joi.object(<
        { [P in keyof NodeJS.ProcessEnv]: Joi.SchemaInternals }
        >{
          BASE_PATH: Joi.string().allow('').optional(),
          CLUSTERING: Joi.boolean().required(),
          LOG_LEVEL: Joi.string()
            .allow('')
            .valid(...validLogLevelList)
            .optional(),
          NODE_ENV: Joi.string()
            .valid(...validNodeEnvList)
            .required(),
          PORT: Joi.number().min(1).max(65535).required(),
        }),
    };
  }
/**
 * @description 配置日志记录器,实现对日志记录行为的精细控制。
 */
public static getLoggerConfig(): Params {
    const { BASE_PATH, CLUSTERING, LOG_LEVEL, NODE_ENV } = process.env;

    return {
      // Exclude may not work for e2e testing
      exclude: [
        {
          method: RequestMethod.ALL,
          path: `${BASE_PATH}/${AppController.prototype.healthz.name}`,
        },
      ],
      pinoHttp: {
        autoLogging: true,
        base: CLUSTERING === 'true' ? { pid: process.pid } : {},
        customAttributeKeys: {
          responseTime: 'timeSpent',
        },
        formatters: { level: (level) => ({ level }) },
        level:
          LOG_LEVEL ||
          (NODE_ENV === NodeEnv.PRODUCTION ? LogLevel.INFO : LogLevel.TRACE),
        serializers: {
          req(request: IncomingMessage) {
            return {
              method: request.method,
              url: request.url,
              // Including the headers in the log could be in violation of privacy laws, e.g. GDPR.
              // headers: request.headers,
            };
          },
          res(reply: ServerResponse) {
            return {
              statusCode: reply.statusCode,
            };
          },
        },
        transport:
          NODE_ENV !== NodeEnv.PRODUCTION
            ? {
              options: {
                translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
              },
              target: 'pino-pretty',
            }
            : null,
      },
    };
  }
}
