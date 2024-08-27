import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';
import { ExternalApproval } from '../../database/entities';
import { BaseTypeormEntityRepository as BaseRepository } from '@ifckit/typeorm';

@Injectable()
export class ExternalApprovalsRepository extends BaseRepository<
  ExternalApproval,
  'id'
> {
  constructor(
    @InjectDataSource()
    ds: DataSource,
  ) {
    super(ExternalApproval, ds, 'id');
  }
}
