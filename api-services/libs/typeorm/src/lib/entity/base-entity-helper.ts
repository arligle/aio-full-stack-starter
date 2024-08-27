import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import type {
  BaseEntity as Base,
  BaseTrackedEntity,
} from '@ifckit/persistence-api';
import { Expose } from 'class-transformer';

export abstract class BaseEntityHelper extends BaseEntity implements Base { }
/**
 * @description 通过这些抽象类，可以简化和标准化实体类的定义和管理，使得代码更加简洁和易于维护。
 * @export
 * @abstract
 * @class BaseTrackedEntityHelper
 */
export abstract class BaseTrackedEntityHelper
  extends BaseEntityHelper
  implements BaseTrackedEntity {
  @ApiProperty({
    type: Date,
    description: 'Created at date time in ISO format',
  })
  @Expose({
    toPlainOnly: true,
  })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({
    type: Date,
    description: 'Last time updated at date time in ISO format',
  })
  @Expose({
    toPlainOnly: true,
  })
  @UpdateDateColumn()
  updatedAt!: Date;

  @ApiProperty({
    type: Date,
    description: 'Deleted at date time in ISO format',
  })
  @Expose({
    toPlainOnly: true,
  })
  @DeleteDateColumn()
  deletedAt?: Date;
}
