import type { NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppConfig, AppModule } from '@/master/modules/app';
import { NestFactory } from '@nestjs/core';
import { clusterize } from '@/master/utils/clustering';
import { initialize } from '@/master/utils/helper';
import { Logger } from '@nestjs/common';

const { CLUSTERING, PORT } = process.env;
const logger = new Logger('NestApplication');

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    AppConfig.getFastifyInstance(),
    { bufferLogs: true } 
  );

  initialize(app);


  // 默认情况下，Fastify 仅侦听 localhost，因此我们应该指定“0.0.0.0”
  await app.listen(PORT, '0.0.0.0', async () => {
    const url = await app.getUrl();
    const { pid } = process;
    logger.log(`[${pid}] Master Server running on: ${url}`)
  });
};
// 如果 CLUSTERING 环境变量为 true，则启用集群模式
if (CLUSTERING === 'true') clusterize(bootstrap);
else bootstrap();
