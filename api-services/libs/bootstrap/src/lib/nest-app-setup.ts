import { ClassSerializerInterceptor, type INestApplication } from "@nestjs/common";
import { Reflector, type HttpAdapterHost } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import type { FastifyInstance } from "fastify/types/instance";
import {
  AnyExceptionFilter,
  HttpExceptionFilter,
  OverrideDefaultForbiddenExceptionFilter,
  OverrideDefaultNotFoundFilter,
  responseBodyFormatter,
} from '@ifckit/exceptions';

import {
  I18nValidationExceptionFilter,
} from '@ifckit/i18n';
import { LoggerErrorInterceptor } from "nestjs-pino";
/*
TODO: 定义了一组方法函数，使用 NestJS 和 Fastify 构建和初始化配置 Web 应用程序。
*/

/**
 * @description 用于创建并返回一个 FastifyAdapter 实例
 * 为 Fastify 服务器提供了一个定制化的适配器，
 * 确保每个请求都有唯一的 ID，并限制了请求体的大小。
 */
export function buildFastifyAdapter() {
  return new FastifyAdapter({
    // TODO:
    // genReqId: (req: { headers: { [x: string]: any } }) => {
    //   const requestId = req.headers[REQUEST_ID_HEADER];
    //   return requestId || generateRandomId();
    // },
    bodyLimit: 10_485_760,
  });
}
/**
 * @description 这是 fastify 的建议，旨在提高与 Express 中间件的兼容性
 */
export function applyExpressCompatibilityRecommendations(
  fastifyInstance: FastifyInstance,
) {
  // 这是 fastify 的建议，旨在提高与 Express 中间件的兼容性
  fastifyInstance
    .addHook('onRequest', async (req) => {
      // @ts-ignore
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      req.socket['encrypted'] = process.env.NODE_ENV === 'production';
    })
    .decorateReply(
      'setHeader',
      /* istanbul ignore next */ function (name: string, value: unknown) {
        this.header(name, value);
      },
    )
    .decorateReply(
      'end',
      /* istanbul ignore next */ function () {
        this.send('');
      },
    );
}
/**
 * @description 设置全局过滤器
 * @param app
 * @param httpAdapterHost 用于处理 HTTP 请求
 */
export function setupGlobalFilters(
  app: INestApplication,
  httpAdapterHost: HttpAdapterHost,
) {
  app.useGlobalFilters(
    new AnyExceptionFilter(httpAdapterHost),
    new OverrideDefaultNotFoundFilter(httpAdapterHost),
    new OverrideDefaultForbiddenExceptionFilter(httpAdapterHost),
    // todo generalize
    // new PostgresDbQueryFailedErrorFilter(httpAdapterHost),
    new HttpExceptionFilter(httpAdapterHost),
    new I18nValidationExceptionFilter({
      responseBodyFormatter,
      detailedErrors: true,
    }),
  );
}
/**
 * @description 设置全局拦截器
 */
export function setupGlobalInterceptors(app: INestApplication) {
  // 使用 ClassSerializerInterceptor 拦截器，将响应对象序列化为 JSON 对象
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(
      // 使用 Reflector 反射器，获取元数据
      app.get(Reflector)
    )
  );
  // 使用 LoggerErrorInterceptor 拦截器，记录错误日志
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
}