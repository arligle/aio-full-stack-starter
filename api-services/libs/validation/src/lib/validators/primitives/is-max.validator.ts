import { max, MAX, Max, type ValidationOptions } from 'class-validator';
import type { IValidatorDefinition } from '../dynamic';
import { i18n, i18nString } from '../../utils';

const MESSAGE = 'validation.MAX';

export const MaxLocalized = (
  n: number,
  validationOptions: ValidationOptions = {},
) => Max(n, { message: i18n(MESSAGE), ...validationOptions });

export const IsMaxValidatorDefinition = {
  name: MAX,
  validator: max,
  defaultValidationMessage: i18nString(MESSAGE),
  decorator: MaxLocalized,
} satisfies IValidatorDefinition<number, number>;
