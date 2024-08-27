import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { ClsService } from 'nestjs-cls';
import type { DataSource } from 'typeorm';
import { SAMLConfiguration } from '../../database/entities';
import { BaseTypeormEntityRepository as BaseTenantRepository } from '@ifckit/typeorm';
import type { TenantClsStore } from '@ifckit/persistence-api';
@Injectable()
export class SamlConfigurationRepository extends BaseTenantRepository<
  SAMLConfiguration,
  'id'
> {
  constructor(
    @InjectDataSource()
    ds: DataSource,
    clsService: ClsService<TenantClsStore>,
  ) {
    super(SAMLConfiguration, ds, 'id');
  }
}
