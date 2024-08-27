import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';
import { UserRole } from '../../database/entities';
import { BaseTypeormEntityRepository as BaseRepository } from '@ifckit/typeorm';

@Injectable()
export class UserRoleRepository extends BaseRepository<UserRole, 'id'> {
  constructor(
    @InjectDataSource()
    ds: DataSource,
  ) {
    super(UserRole, ds, 'id');
  }
}
