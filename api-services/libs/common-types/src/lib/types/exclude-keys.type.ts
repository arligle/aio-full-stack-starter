import type { ExtractArrayMembers } from './extract-array-members.type';

type KeysOrListOfKeys<T> = keyof T | readonly (keyof T)[];
/*
从TObject对象类型中排除指定的键
*/
export type ExcludeKeys<
  TObject,
  TKeys extends KeysOrListOfKeys<TObject>,
> = Omit<TObject, ExtractArrayMembers<TKeys>>;
