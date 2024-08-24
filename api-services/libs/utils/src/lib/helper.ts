import type { NormalException } from '@/master/exception';
import type { INestApplication } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';

import { NodeEnv } from '@/master/shared/enums';
import { Logger } from 'nestjs-pino';

/**
 * 返回由带有数据键的对象包装的数据。
 */
export const toSwaggerError = (
  exception: NormalException,
  options?: ApiResponseOptions
) => {
  return {
    content: { 'application/json': { example: exception.toJSON() } },
    ...options,
  };
};

/**
 * 封装引导程序的初始化设置、E2E 测试和 swagger 脚本恢复
 */
export const initialize = (app: INestApplication) => {
  const { BASE_PATH, NODE_ENV } = process.env;

  app.useLogger(app.get(Logger));

  app.enableVersioning();

  // 启用 CORS（跨域资源共享）
  if (NODE_ENV === NodeEnv.DEVELOPMENT) app.enableCors();

  // 为了方便，在进行 e2e 测试时排除设置基本路径
  if (BASE_PATH && NODE_ENV !== NodeEnv.TEST) app.setGlobalPrefix(BASE_PATH);
};
