import { plainToInstance } from 'class-transformer';
import type {
  ClassConstructor,
  ClassTransformOptions,
} from 'class-transformer/types/interfaces';

export function map<FROM, TO>(
  from: FROM[],
  clazz: ClassConstructor<TO>,
  options?: ClassTransformOptions,
): TO[];

export function map<FROM, TO>(
  from: FROM,
  clazz: ClassConstructor<TO>,
  options?: ClassTransformOptions,
): TO;

export function map<FROM, TO>(
  from: FROM | FROM[],
  clazz: ClassConstructor<TO>,
  options?: ClassTransformOptions,
): TO | TO[] {
  return plainToInstance(clazz, from, {
    ...DEFAULT_MAP_OPTIONS,
    ...options,
  });
}

export const DEFAULT_MAP_OPTIONS: ClassTransformOptions = {
  excludeExtraneousValues: true,
  exposeDefaultValues: true,
  ignoreDecorators: true,
  exposeUnsetFields: false,
};

/*
提供了一种简便的方法，将普通对象或对象数组转换为指定类的实例，同时支持自定义转换选项。
定义了一个名为 map 的泛型函数，用于将一个对象或对象数组转换为指定类的实例。
它使用了 class-transformer 库中的 plainToInstance 函数来实现这一功能。

*/