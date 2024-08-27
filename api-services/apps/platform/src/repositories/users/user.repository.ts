import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';
import { UserProfile } from '../../database/entities';
import { BaseTypeormEntityRepository as BaseRepository } from '@ifckit/typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserProfile, 'id'> {
  constructor(
    @InjectDataSource()
    ds: DataSource,
  ) {
    super(UserProfile, ds, 'id');
  }
}
