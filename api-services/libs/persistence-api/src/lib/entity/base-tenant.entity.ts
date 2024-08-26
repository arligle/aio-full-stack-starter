import type { BaseTrackedEntity } from './base-tracked.entity';
import type { BaseEntity } from './base.entity';

export interface BaseTenantedEntity extends BaseEntity {
  tenantId: string;
}

export interface BaseTenantedTrackedEntity
  extends BaseTenantedEntity,
  BaseTrackedEntity { }
