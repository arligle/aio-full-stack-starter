/*
用于从数组类型中提取成员类型，
或者在给定类型是基本类型（如字符串、数字或符号）时直接返回该类型。
*/
export type ExtractArrayMembers<T> = T extends readonly (infer MemberType)[]
  ? MemberType
  : T extends string | number | symbol
  ? T
  : never;
