import type { ValidationError } from '@nestjs/common';

import {
  AllExceptionFilter,
  NormalExceptionFilter,
  ValidationExceptionFilter,
} from '@/master/filter';
import { ResponseInterceptor } from '@/master/interceptor/response.interceptor';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';

import { AppConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [
    // 允许访问 .env 文件并验证环境变量
    ConfigModule.forRoot(AppConfig.getInitConifg()),
    // 导入 pino 日志记录器
    LoggerModule.forRoot(AppConfig.getLoggerConfig()),
  ],
  providers: [
    AppService,
    /*
    全局的异常过滤器，用于处理所有异常
    useClass 属性指定了具体的异常过滤器类。三个不同的异常过滤器类：
    AllExceptionFilter：这个过滤器可能用于捕获和处理所有类型的异常。它通常是一个通用的异常处理器，确保任何未处理的异常都能被捕获并进行适当的处理。
    NormalExceptionFilter：这个过滤器可能用于处理常规的异常。它可能专注于处理一些常见的、预期内的异常情况。
    ValidationExceptionFilter：这个过滤器专门用于处理验证异常。验证异常通常是在数据验证失败时抛出的，例如用户输入不符合预期格式或规则。
    
    通过将这些过滤器提供给 APP_FILTER，NestJS 会在应用程序中全局使用这些过滤器来处理相应的异常。
    需要注意的是，多个 APP_FILTER 提供者的顺序可能会影响它们的执行顺序，因此你需要确保它们的顺序符合你的预期处理逻辑。
    */
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_FILTER, useClass: NormalExceptionFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },

    {
      /**
       * 允许通过 DTO 进行验证
       * 由于类验证器库默认抛出BadRequestException，这里我们使用ExceptionFactory来抛出
       * 它们的内部异常，以便过滤器可以识别它
       */
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          },
        }),
    },
    { 
      // 全局拦截器，用于处理所有响应
      provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
