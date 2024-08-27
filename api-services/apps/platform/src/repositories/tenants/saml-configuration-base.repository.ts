import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';
import { SAMLConfiguration } from '../../database/entities';
import { BaseTypeormEntityRepository as BaseRepository } from '@ifckit/typeorm';

@Injectable()
export class SamlConfigurationBaseRepository extends BaseRepository<
  SAMLConfiguration,
  'id'
> {
  constructor(
    @InjectDataSource()
    ds: DataSource,
  ) {
    super(SAMLConfiguration, ds, 'id');
  }
}
