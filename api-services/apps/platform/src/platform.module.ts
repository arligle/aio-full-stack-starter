import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { setupYamlBaseConfigModule } from '@ifckit/config';
import RootConfig from './config/root.config';
import path from 'node:path';

@Module({
  imports: [

    /*
    setupYamlBaseConfigModule()函数返回的对象包含了
    TypedConfigModule.forRoot()函数的返回值，
    所以可以直接使用setupYamlBaseConfigModule()函数的返回值作为imports的参数。
    */
    setupYamlBaseConfigModule(
      path.join(__dirname, './assets'),
      RootConfig
    ),
  ],
  controllers: [PlatformController],
  providers: [PlatformService],
})
export class PlatformModule { }
