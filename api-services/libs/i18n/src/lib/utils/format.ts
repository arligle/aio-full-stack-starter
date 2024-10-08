import type { ValidationError } from '@nestjs/common';

export const mapChildrenToValidationErrors = (
  error: ValidationError,
  parentPath?: string,
): ValidationError[] => {
  if (!(error.children && error.children.length > 0)) {
    return [error];
  }
  const validationErrors = [];
  // biome-ignore lint/style/noParameterAssign: <explanation>
  parentPath = parentPath ? `${parentPath}.${error.property}` : error.property;
  for (const item of error.children) {
    if (item.children && item.children.length > 0) {
      validationErrors.push(...mapChildrenToValidationErrors(item, parentPath));
    }
    validationErrors.push(prependConstraintsWithParentProp(parentPath, item));
  }
  return validationErrors;
};

const prependConstraintsWithParentProp = (
  parentPath: string,
  error: ValidationError,
): ValidationError => {
  const constraints: { [type: string]: string } = {};
  for (const key in error.constraints) {
    constraints[key] = `${parentPath}.${error.constraints[key]}`;
  }
  return {
    ...error,
    constraints,
  };
};
