import { HttpStatus } from '@nestjs/common';
import { type I18nValidationError, I18nValidationException } from '@ifckit/i18n';
import type { ErrorResponse } from '../vo/error-response.dto';
import { i18nString } from '../utils/i18n';

export class GeneralBadRequestException extends I18nValidationException {
  constructor(
    errors: I18nValidationError | I18nValidationError[],
    public detail?: string,
    public errorCode?: string,
    public rootCause?: unknown,
  ) {
    super(Array.isArray(errors) ? errors : [errors], HttpStatus.BAD_REQUEST);
  }

  toErrorResponse(): Omit<ErrorResponse, 'data' | 'instance'> {
    return {
      title: i18nString('exception.BAD_REQUEST.TITLE'),
      detail: this.detail ?? i18nString('exception.BAD_REQUEST.GENERAL_DETAIL'),
      status: HttpStatus.BAD_REQUEST,
      type: 'todo implement link to docs',
      errorCode: this.errorCode,
    };
  }
}
