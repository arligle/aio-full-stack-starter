import { isObject } from 'class-validator';
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { hasOwnProperty } from 'typeorm-extension';

export const isMeta = (
  input: unknown,
): input is { ownerId: string;[key: string]: unknown } => {
  return (
    isObject(input) &&
    hasOwnProperty(input, 'ownerId') &&
    typeof input.ownerId === 'string'
  );
};
