import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';
import { Permission } from '../../database/entities';
import { BaseTypeormEntityRepository as BaseRepository } from '@ifckit/typeorm';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission, 'id'> {
  constructor(
    @InjectDataSource()
    ds: DataSource,
  ) {
    super(Permission, ds, 'id');
  }
}
