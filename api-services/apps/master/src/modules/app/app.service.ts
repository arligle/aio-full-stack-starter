import * as packageJSON from '@/api-services/package.json';
import { Injectable } from '@nestjs/common';

import type { VersionRes } from './dto';

@Injectable()
export class AppService {
  public getVersion(): VersionRes {
    return { version: packageJSON.version };
  }

  public healthz(): string {
    return 'OK';
  }
}
/*
导入package.json 文件的意义：
文件包含了项目的元数据，例如项目名称、版本、依赖项等。
通过导入 package.json 文件，您可以在代码中访问这些信息。
例如，您可以读取项目的版本号或依赖项列表，以便在应用程序中动态使用这些数据。
*/