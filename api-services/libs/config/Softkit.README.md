# Config Library

该库提供了一组用于配置的通用服务和实用程序。
它可以在 Softkit 之外的外部项目使用


该库基于[nestjs-typed-config](https://github.com/Nikaple/nest-typed-config)
所有主要工作都在父库中完成，这只是一个包装器，以使其更易于使用

---

## Installation

```bash
yarn add @ifckit/config
```

---

## Usage

```typescript
import { setupYamlBaseConfigModule } from '@ifckit/config';


@Module({
  imports: [
    setupYamlBaseConfigModule(path.join(__dirname, './assets'), RootConfig),
  ]
})
export class YourAppModule {}


```

---

`./assets` -是一个包含配置文件的文件夹。上面的例子就是这样的代码结构:


```bash                                                                        git(docs/readme_for_each_module↑1|✚1…1 
.
├── assets
│     ├── .env-test.yaml
│     └── .env.yaml
├── config
│     └── root.config.ts
└── your-app.module.ts
```

---


## This wrapper has a few additions: 

- 它具有*配置文件*功能，因此您可以针对不同的环境进行不同的配置。
  - NESTJS_PROFILES -是一个环境变量，用于定义要使用的配置文件
  - 默认情况下，它没有配置文件，仅使用主要提供的文件名
  - 配置文件的顺序很重要，它定义了如何合并配置，以防出现任何冲突
  - Example: 
    - `NESTJS_PROFILES=dev,local` - will use `.env-dev.yaml` and `.env-local.yaml` files and base `.env.yaml`
    - `NESTJS_PROFILES=dev` - will use only `.env-dev.yaml` file and base `.env.yaml`
  - 默认情况下，我们建议在 jest config 中设置测试配置文件。在 jest.preset.js 中
  ```javascript
     process.env.NESTJS_PROFILES = 'test';
  ```
- 另一个调整是为 RootConfig 类添加通用别名，这样我们就可以以相同的方式在各种应用程序中重用它。
  - 要在另一个库中注入配置，您只需要使用通用令牌“ROOT_CONFIG_ALIAS_TOKEN”
  - 我们利用 NestJS DI 使用现有功能以通用方式提供配置
      ```typescript
      {
        provide: ROOT_CONFIG_ALIAS_TOKEN,
        useExisting: rootSchemaClass,
      }
      ```
  - 在您的库中，您可以期望此提供程序在全局范围内可用，并且您可以强制此配置来实现您的接口。因此，您将能够很好地解耦应用程序，并声明性地定义您需要在库中使用的配置。
    - Example in your library:
      ```typescript
      import { Inject, Injectable } from '@nestjs/common';
      import { ROOT_CONFIG_ALIAS_TOKEN, RootConfig } from '@ifckit/config';
      import { YourConfigInterface } from './your-config.interface';
      
      @Injectable()
      export class YourService {
        constructor(
          @Inject(ROOT_CONFIG_ALIAS_TOKEN)
          private readonly config: YourConfigInterface,
        ) {}
      
        getYourConfig(): YourConfigInterface {
          return this.config.yourConfig;
        }
      }
      ```
      

## Example config file structure

```yaml
# .env.yaml
isAuthEnabled: ${AUTH_ENABLED:-true}
database:
  host: ${DATABASE_HOST:-127.0.0.1}
  port: ${DATABASE_PORT:-3000}
  table:
    name: ${TABLE_NAME:-users}

databaseAlias:
  host: ${database.host}
  port: ${database.port}
  table:
    name: ${database.table.name}
```

`正如您所看到的，您可以在配置文件中利用 ENV 变量，或者使用一个值来引用配置文件中的另一个值`

您的 .env.yaml 文件通常很大并且包含大量配置，因此在代码中使用它不是很方便。
配置文件所在的位置，只是覆盖所需环境的一些特定内容

假设对于测试，我们始终连接到端口“12345”. 

你只需要创建这个文件，当你设置环境变量“NESTJS_PROFILES=test”时，它将用于测试：

```yaml
# .env-test.yaml
database:
  port: 12345
```
