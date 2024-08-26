import { Injectable } from '@nestjs/common';
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import type { DbConfig } from './db';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly dbConfig: DbConfig) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.dbConfig,
    } as TypeOrmModuleOptions;
  }
}
