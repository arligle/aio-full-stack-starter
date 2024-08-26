import { IS_UUID, isUUID, IsUUID, type ValidationOptions } from 'class-validator';
import type { UUIDVersion } from 'class-validator/types/decorator/string/IsUUID';
import type { IValidatorDefinition } from '../dynamic';
import { i18n, i18nString } from '../../utils';

const MESSAGE = 'validation.UUID_V4';

export const IsUUIDLocalized = (
  opt: UUIDVersion = 4,
  validationOptions: ValidationOptions = {},
) =>
  IsUUID(opt, {
    message: i18n(MESSAGE),
    ...validationOptions,
  });

export const IsUUIDValidatorDefinition = {
  name: IS_UUID,
  validator: isUUID,
  defaultValidationMessage: i18nString(MESSAGE),
  decorator: IsUUIDLocalized,
} satisfies IValidatorDefinition<string, UUIDVersion>;
