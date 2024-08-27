import { BaseTrackedEntityHelper } from './base-entity-helper';
import { Column, Index } from 'typeorm';
import { ClsPreset } from '../subscribers/decorator/cls-preset.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import type { BaseTenantedEntity, TenantClsStore } from '@ifckit/persistence-api';
/**
 * @description 通过这些装饰器的组合，BaseTenantEntityHelper 类
 * 不仅定义了租户标识符的存储和索引方式，还提供了丰富的元数据和功能支持，
 * 使其在不同的上下文中都能被正确处理和使用。
 * @export
 * @class BaseTenantEntityHelper
 */
export class BaseTenantEntityHelper
  extends BaseTrackedEntityHelper
  implements BaseTenantedEntity {
  @ApiProperty({
    description: 'Tenant identifier',
    type: 'string',
  })
  @ClsPreset<TenantClsStore>({
    clsFieldName: 'tenantId',
  })
  @Column({ nullable: false })
  @Index()
  @Expose()
  tenantId!: string;
}
// 确保 tenantId 属性在 Tenant 类型中存在
export interface Tenant extends BaseTenantEntityHelper {
  // 其他属性定义
}
