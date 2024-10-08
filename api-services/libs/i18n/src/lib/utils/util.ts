import {
  type I18nOptionResolver,
  type I18nValidationError,
  I18nValidationException,
} from '../interfaces';
import {
  getMetadataStorage,
  type ValidationArguments,
  type ValidationError,
} from 'class-validator';
import type { I18nService, TranslateOptions } from '../services/i18n.service';
import type { MiddlewareConsumer } from '@nestjs/common';
import type { NestMiddlewareConsumer, Path } from '../types';
import { isResolverWithOptions } from './type-guards';

export function shouldResolve(e: I18nOptionResolver) {
  return typeof e === 'function' || isResolverWithOptions(e);
}

function validationErrorToI18n(e: ValidationError): I18nValidationError {
  const errorConstraints = e.constraints ?? {};
  return {
    property: e.property,
    value: e.value,
    target: e.target,
    contexts: e.contexts,
    children: e?.children?.map(validationErrorToI18n),
    constraints: Object.keys(errorConstraints).reduce<{
      [type: string]: string;
    }>((result, key) => {
      result[key] = errorConstraints[key];
      return result;
    }, {}),
  };
}

export function i18nValidationErrorFactory(
  errors: ValidationError[],
): I18nValidationException {
  return new I18nValidationException(
    errors.map((e) => {
      return validationErrorToI18n(e);
    }),
  );
}

export function i18nValidationMessage<K = Record<string, unknown>>(
  key: Path<K>,
  args?: any,
) {
  return (a: ValidationArguments) => {
    const { constraints } = a;
    let { value } = a;
    if (typeof value === 'string') {
      value = value.replaceAll('|', '');
    }
    return `${key}|${JSON.stringify({ value, constraints, ...args })}`;
  };
}

/**
 * utility function just for type safety
 * */
export function i18nValidationMessageString<K = Record<string, unknown>>(
  key: Path<K>,
): string {
  return key;
}

export function formatI18nErrors<K = Record<string, unknown>>(
  errors: I18nValidationError[],
  i18n?: I18nService<K>,
  options?: TranslateOptions,
): I18nValidationError[] {
  return errors.map((error) => {
    const errorTarget = error?.target;
    const errorConstraints = error?.constraints;
    if (!errorTarget || !errorConstraints) {
      return error;
    }

    const limits = getMetadataStorage()
      .getTargetValidationMetadatas(
        errorTarget.constructor,
        errorTarget.constructor.name,
        true,
        false,
      )
      .find(
        (meta) =>
          meta.target === errorTarget.constructor &&
          meta.propertyName === error.property,
      );
    const constraints = Object.assign({}, limits?.constraints);
    error.children = formatI18nErrors(error.children ?? [], i18n, options);
    error.constraints = Object.keys(errorConstraints).reduce<{
      [type: string]: string;
    }>((result, key) => {
      const [translationKey, argsString] = errorConstraints[key].split('|');
      const args = argsString ? JSON.parse(argsString) : {};

      result[key] =
        i18n?.translate(translationKey as Path<K>, {
          ...options,
          args: {
            property: error.property,
            value: error.value,
            target: error.target,
            contexts: error.contexts,
            constraints: constraints,
            ...args,
          },
        }) || error.property;
      return result;
    }, {});
    return error;
  });
}

export const isNestMiddleware = (
  consumer: MiddlewareConsumer,
): consumer is NestMiddlewareConsumer => {
  return typeof (consumer as any).httpAdapter === 'object';
};

export const usingFastify = (consumer: NestMiddlewareConsumer) => {
  return consumer.httpAdapter.constructor.name
    .toLowerCase()
    .startsWith('fastify');
};
