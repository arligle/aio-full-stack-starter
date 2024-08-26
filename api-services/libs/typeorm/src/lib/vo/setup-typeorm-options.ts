import type { Type } from '@nestjs/common';
import type { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import type { MixedList } from 'typeorm';
import { TypeOrmConfigService } from '../config/typeorm-config.service';

export interface SetupTypeormOptions {
  optionsFactory?: Type<TypeOrmOptionsFactory>;
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  migrations?: MixedList<Function>;
}

export const DEFAULT_SETUP_TYPEORM_OPTIONS: SetupTypeormOptions = {
  optionsFactory: TypeOrmConfigService,
  migrations: [],
};
