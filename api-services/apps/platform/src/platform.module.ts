import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { setupLoggerModule } from '@ifckit/logger';
import { setupYamlBaseConfigModule } from '@ifckit/config';
import RootConfig from './config/root.config';
import * as path from 'node:path';
import { Logger } from 'nestjs-pino';


@Module({
  imports: [
    setupLoggerModule(),
    /*
    setupYamlBaseConfigModule()函数返回的对象包含了
    TypedConfigModule.forRoot()函数的返回值，
    所以可以直接使用setupYamlBaseConfigModule()函数的返回值作为imports的参数。
    */
    // TODO: 注意环境变量的配置文件的路径获取，__dirname是构建后dist目录下的main.js文件所在的目录
    setupYamlBaseConfigModule(
      path.join(__dirname, '../../../', 'apps/platform/'),
      RootConfig
    ),
  ],
  controllers: [PlatformController],
  providers: [
    PlatformService,
    Logger,
  ],
})
export class PlatformModule { }
