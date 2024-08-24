# Logger Library

该库基于 pino 记录器，并为 Softkit 生态系统提供了一个固定的记录器。

默认情况下，它会记录完成请求，以及请求 ID 和时间，并使用堆栈跟踪记录所有异常。

一般来说，为 Nestjs 应用程序设置合适的记录器是一件很痛苦的事情。

我们解决了登录项目时遇到的大多数配置问题。

还可以利用 ClsService 在日志中包含正确的请求 ID。

## Installation

```bash
yarn add @softkit/logger
```

## Usage

### Default interceptors

- **LoggingInterceptor** - it will log all incoming requests


### Default configuration

```typescript

import { setupLoggerModule } from '@softkit/logger';

@Module({
  imports: [
    setupLoggerModule(),
  ]
})
export class YourAppModule {}

```

### Update your root config class

```typescript

export class RootConfig {
  @Type(() => LoggerConfig)
  @ValidateNested()
  public readonly logger!: LoggerConfig;
}

```

### Update your config files

`.env.yaml` file

```yaml
logs:
#  对开发也有用
  colorize: true
#  info should be used for production in most cases, unless you want to debug something
  level: info
#  漂亮的打印通常仅在开发时需要，因此必须在 .env-${env}.yaml 文件中进行更改以进行部署
  prettyPrint: true
```





