import type { BaseEntity } from './base.entity';
/**
 * @description 接口定义了用于跟踪操作的几个基本属性，
 */
export interface BaseTrackedEntity extends BaseEntity {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
