import { NestFactory } from "@nestjs/core";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { PlatformModule } from "./platform.module";
import { buildFastifyAdapter } from '@ifckit/bootstrap';
import { Logger } from "nestjs-pino";
import { clusterize } from '@ifckit/utils';


const { CLUSTERING } = process.env;
const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    PlatformModule,
    buildFastifyAdapter(),
  );
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();

  // TODO: 其他的初始化配置操作
  // initialize(app);


  // 默认情况下，Fastify 仅侦听 localhost，因此我们应该指定“0.0.0.0”
  await app.listen(3000, '0.0.0.0', async () => {
    const url = await app.getUrl();
    const { pid } = process;
    logger.log(`[${pid}] Master Server running on: ${url}`)
  });
};
// 如果 CLUSTERING 环境变量为 true，则启用集群模式
if (CLUSTERING === 'true') clusterize(bootstrap);
else bootstrap();