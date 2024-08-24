import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsObject,
  type ValidationOptions,
  IsOptional,
} from 'class-validator';

interface ValidateNestedPropertyOptions<T> {
  required?: boolean;
  validationOptions?: ValidationOptions;
  classType: new () => T;
}
/**
 * @description 用于在 NestJS 框架中验证嵌套对象属性。
这个装饰器函数结合了多个验证装饰器，以便简化对嵌套对象属性的验证逻辑。
 */
export const ValidateNestedProperty = <T>({
  required = true,
  validationOptions = {},
  classType,
}: ValidateNestedPropertyOptions<T>) => {
  const decorators = [ValidateNested(validationOptions), Type(() => classType)];

  if (required) {
    decorators.push(IsObject(validationOptions));
  } else {
    decorators.push(IsOptional(validationOptions));
  }

  return applyDecorators(...decorators);
};
