import type { BaseTrackedEntityHelper, BaseEntityHelper } from '../../index';

export const DEFAULT_ENTITY_EXCLUDE_LIST = [
  'hasId',
  'setEntityName',
  'recover',
  'softRemove',
  'reload',
  'save',
] as Array<keyof BaseEntityHelper>;

export const DEFAULT_CREATE_ENTITY_EXCLUDE_LIST = [
  ...DEFAULT_ENTITY_EXCLUDE_LIST,
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'version',
] as Array<keyof BaseTrackedEntityHelper>;

export const DEFAULT_UPDATE_ENTITY_EXCLUDE_LIST = [
  ...DEFAULT_ENTITY_EXCLUDE_LIST,
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as Array<keyof BaseEntityHelper | 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
