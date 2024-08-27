import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';
import { PermissionCategory } from '../../database/entities';
import { BaseTypeormEntityRepository as BaseRepository } from '@ifckit/typeorm';

@Injectable()
export class PermissionCategoryRepository extends BaseRepository<
  PermissionCategory,
  'id'
> {
  constructor(
    @InjectDataSource()
    ds: DataSource,
  ) {
    super(PermissionCategory, ds, 'id');
  }
}
