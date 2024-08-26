import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import type { HttpAdapterHost } from '@nestjs/core';
import { I18nContext } from '@ifckit/i18n';
import type { ErrorResponse } from '../vo/error-response.dto';
import type { I18nTranslations } from '../generated/i18n.generated';

@Catch(NotFoundException)
export class OverrideDefaultNotFoundFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: NotFoundException, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const i18n = I18nContext.current<I18nTranslations>(host);

    const response = {
      // todo implement link to the docs, get from config
      type: 'todo implement link to the docs, get from config',
      title:
        i18n?.translate('exception.NOT_FOUND.TITLE') ??
        /* istanbul ignore next */ 'Not Found',
      detail:
        i18n?.translate('exception.NOT_FOUND.GENERAL_DETAIL').toString() ??
        /* istanbul ignore next */ 'Resource not found',
      status: HttpStatus.NOT_FOUND,
      instance: ctx.getRequest().id,
    } satisfies ErrorResponse;

    httpAdapter.reply(ctx.getResponse(), response, response.status);
  }
}
