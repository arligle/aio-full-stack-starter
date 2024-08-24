
# Validation Wrapper around class-validator

### We need this wrapper because of few reasons: 

- class-validator 是一个不错的库，但并未得到积极支持。不再这样了，我们考虑分叉它并自己维护它。
- 类验证器有很多替代品，但它是我们使用过的最方便的一种，并且许多其他库也在使用它。因此，为所有事情设置一个验证器是一个好主意。
- 类验证器停止支持动态验证模式，在这个库中，我们根据我们的需求和结构实现了它
- 我们还使用 [nestjs-i18n](https://www.npmjs.com/package/@softkit/i18n) 来紧固它，这样我们就可以轻松覆盖默认翻译
- 此外，我们还为日期和布尔值等类型提供了更好的转换器，默认的类验证器转换器无法与这些和其他类型正常工作
- 提供额外有用的装饰器，如“@Match”，以检查一个字段是否与另一个字段匹配，以及类验证器中缺少的其他常见请求的装饰器，或适当的 @IsEmailLocalized 验证器，并且它们已本地化


### 方法的验证规则，可以在[此处](https://github.com/mikeerickson/validatorjs/blob/master/src/rules.js)找到

### Installation

```bash
yarn add @softkit/validation
```

### Usage

用法与普通的 [class-validator](https://github.com/typestack/class-validator) 一样简单

### 动态验证器的使用

- 此示例将抛出适当的异常，该异常将由我们的过滤器处理，如果值与验证器架构不匹配，则返回 RFC7807 错误响应

```typescript
import { IsEnumValidatorDefinition, validateAndThrow } from '@softkit/validators';

validateAndThrow(
  IsEnumValidatorDefinition,
  'fieldName',
  'fieldValue',
  ['enumValue1', 'enumValue2'],
);
```

- This example will throw exception if value doesn't match constraint 

```typescript
import { MatchesRegexpValidatorDefinition, validateAndThrow } from '@softkit/validators';

const constraint = /^-?(?!0\d)\d+$/;

validateAndThrow(
  MatchesRegexpValidatorDefinition,
  params.key,
  value as string,
  constraint,
  i18nString('validation.INTEGER'),
);

```

-- 如果您不需要立即抛出异常，您可以使用“validateAndReturnError”方法，该方法返回“ValidationError”对象，您可以稍后使用

```typescript
import { IsEnumValidatorDefinition, validateAndThrow } from '@softkit/validators';

const error = validateAndReturnError(
  IsEnumValidatorDefinition,
  'fieldName',
  'fieldValue',
  ['enumValue1', 'enumValue2'],
);

console.log(error);

```


