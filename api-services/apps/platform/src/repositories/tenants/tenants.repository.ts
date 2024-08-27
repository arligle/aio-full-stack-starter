import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';
import { Tenant } from '../../database/entities';
import { BaseTypeormEntityRepository as BaseRepository } from '@ifckit/typeorm';

@Injectable()
export class TenantsRepository extends BaseRepository<Tenant, 'id'> {
  constructor(
    @InjectDataSource()
    readonly ds: DataSource,
  ) {
    super(Tenant, ds, 'id');
  }
}
