import { Injectable } from '@nestjs/common';
import type { ClsService } from 'nestjs-cls';
import type {
  DataSource,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import {
  defaultClsMetadataStore,
  PresetType,
  type TenantClsStore,
} from '@ifckit/persistence-api';

@Injectable()
export class ClsPresetSubscriber<ClsStoreType extends TenantClsStore>
  implements EntitySubscriberInterface {
  constructor(
    private readonly dataSource: DataSource,
    private readonly clsService: ClsService<ClsStoreType>,
  ) {
    this.dataSource.subscribers.push(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beforeInsert(event: InsertEvent<any>): Promise<any> | undefined {
    /* istanbul ignore next */
    if (event.entity === undefined) {
      return;
    }

    return this.handleEntityChangeEvent(
      event.metadata.inheritanceTree,
      event.entity,
      PresetType.INSERT,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beforeUpdate(event: UpdateEvent<any>) {
    /* istanbul ignore next */
    if (event.entity === undefined) {
      return;
    }

    return this.handleEntityChangeEvent(
      event.metadata.inheritanceTree,
      event.entity,
      PresetType.UPDATE,
    );
  }

  private handleEntityChangeEvent(
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    inheritanceTree: Function[],
    entity: any,
    presetType: PresetType,
  ) {
    const topLevelEntity = inheritanceTree[0].name;
    const entityHierarchy = inheritanceTree.map((e) => e.name);

    const metadataFields =
      defaultClsMetadataStore.getMetadataFieldsByEntityHierarchy(
        topLevelEntity,
        entityHierarchy,
      );

    for (const field of metadataFields) {
      if (
        field.presetType === PresetType.ALL ||
        presetType === field.presetType
      ) {
        const currentValue = entity[field.entityPropertyName];
        // set value only if it's not provided
        if (currentValue === null || currentValue === undefined) {
          entity[field.entityPropertyName] =
            this.clsService.get()[field.clsStorageKey];
        }
      }
    }

    return entity;
  }
}
