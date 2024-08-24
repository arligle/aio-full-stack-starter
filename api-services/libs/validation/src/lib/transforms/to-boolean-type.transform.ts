import { Transform } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';
/*
定义了一个名为 BooleanType 的装饰器，用于将输入值转换为布尔类型。
这种转换器在处理从请求中接收到的字符串值时特别有用，
因为在 HTTP 请求中，所有数据通常都是以字符串形式传递的。
通过使用 BooleanType 装饰器，我们可以确保属性值在使用前被正确转换为布尔类型，
从而提高代码的健壮性和可维护性。
*/


/**
 * 用于将输入值转换为布尔类型的装饰器。
 */
export const BooleanType = applyDecorators(
  Transform(({ value }) =>
    typeof value === 'boolean' ? value : value === 'true',
  ),
);

/*
这个转换器会检查输入值的类型：
- 如果输入值已经是布尔类型，则直接返回该值。
- 如果输入值是字符串 'true'，则返回布尔值 true。
- 对于其他情况，返回布尔值 false。
*/
