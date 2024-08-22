import { Global, type DynamicModule } from '@nestjs/common';
import {
  type ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  type OPTIONS_TYPE,
} from './node-postgres.definition';
import { DrizzlePGService } from './node-postgres.service';
import type { DrizzlePGConfig } from './node-postgres.interface';

@Global()
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DrizzlePGModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    const { providers = [], exports = [], ...props } = super.register(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzlePGService,
        {
          provide: options?.tag || 'default',
          useFactory: async (drizzleService: DrizzlePGService) => {
            return await drizzleService.getDrizzle(options);
          },
          inject: [DrizzlePGService],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const {
      providers = [],
      exports = [],
      ...props
      // biome-ignore lint/complexity/noThisInStatic: <explanation>
    } = super.registerAsync(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzlePGService,
        {
          provide: options?.tag || 'default',
          useFactory: async (
            drizzleService: DrizzlePGService,
            config: DrizzlePGConfig
          ) => {
            return await drizzleService.getDrizzle(config);
          },
          inject: [DrizzlePGService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
}
