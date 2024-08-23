import { fileLoader, TypedConfigModule } from 'nest-typed-config';
import { ROOT_CONFIG_ALIAS_TOKEN } from './constants';
import type { SetupConfigOptions } from './vo/setup-config-options';
import { getExistingFilePaths } from './utils/get-existing-file-paths';
import type { Type } from '@nestjs/common';

export function setupYamlBaseConfigModule(
  baseDir: string,
  rootSchemaClass: Type<unknown>,
  options?: SetupConfigOptions,
) {
  const existingFilePaths = getExistingFilePaths(
    baseDir,
    options?.folderName,
    options?.baseFileName,
    options?.profiles,
  );

  const dynamicModule = TypedConfigModule.forRoot({
    schema: rootSchemaClass,
    isGlobal: true,
    load: existingFilePaths.map((filePath) => {
      return fileLoader({
        absolutePath: filePath,
        ignoreEnvironmentVariableSubstitution: false,
        ignoreEmptySearchPlaces: false,
      });
    }),
  });
  /*
  返回一个包含动态模块的对象，并额外添加了providers和exports
  其中，providers 包含一个提供者，它将 ROOT_CONFIG_ALIAS_TOKEN 绑定到 rootSchemaClass，
  而 exports 则导出 ROOT_CONFIG_ALIAS_TOKEN。
  */
  return {

    ...dynamicModule,
    providers: [
      ...(dynamicModule.providers ?? []),
      {
        provide: ROOT_CONFIG_ALIAS_TOKEN,
        useExisting: rootSchemaClass,
      },
    ],
    exports: [...(dynamicModule.exports ?? []), ROOT_CONFIG_ALIAS_TOKEN],
  };
}
