import {
  type CallHandler,
  type ExecutionContext,
  Inject,
  Injectable,
  type NestInterceptor,
  type Type,
} from '@nestjs/common';
import { I18N_OPTIONS, I18N_RESOLVERS } from '../i18n.constants';
import type {
  I18nOptions,
  I18nResolver,
  ResolverWithOptions,
  I18nOptionResolver,
} from '../interfaces';
import type { I18nService } from '../services/i18n.service';
import type { ModuleRef } from '@nestjs/core';
import { Observable } from 'rxjs';
import { I18nContext } from '../i18n.context';
import { shouldResolve, getContextObject } from '../utils';
import { isResolverWithOptions } from '../utils/type-guards';

@Injectable()
export class I18nLanguageInterceptor implements NestInterceptor {
  constructor(
    @Inject(I18N_OPTIONS)
    private readonly i18nOptions: I18nOptions,
    @Inject(I18N_RESOLVERS)
    private readonly i18nResolvers: I18nOptionResolver[],
    private readonly i18nService: I18nService,
    private readonly moduleRef: ModuleRef,
  ) { }

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const i18nContext = I18nContext.current();
    let language = null;

    const ctx = getContextObject(context);

    // Skip interceptor if language is already resolved (in case of http middleware)
    // or when ctx is undefined (unsupported context)
    if (ctx === undefined || !!ctx.i18nLang) {
      return next.handle();
    }

    ctx.i18nService = this.i18nService;

    for (const r of this.i18nResolvers) {
      const resolver = await this.getResolver(r);

      language = resolver.resolve(context);

      if (language instanceof Promise) {
        language = await (language as Promise<string>);
      }

      if (language !== undefined) {
        break;
      }
    }

    ctx.i18nLang = language || this.i18nOptions.fallbackLanguage;

    // Pass down language to handlebars
    if (ctx.app?.locals) {
      ctx.app.locals.i18nLang = ctx.i18nLang;
    }

    if (!i18nContext) {
      ctx.i18nContext = new I18nContext(ctx.i18nLang, this.i18nService);

      if (!this.i18nOptions.skipAsyncHook) {
        return new Observable((observer) => {
          I18nContext.createAsync(ctx.i18nContext, async (error) => {
            if (error) {
              throw error;
            }
            return next.handle().subscribe(observer);
          });
        });
      }
    }

    return next.handle();
  }

  private async getResolver(r: I18nOptionResolver): Promise<I18nResolver> {
    if (shouldResolve(r)) {
      if (isResolverWithOptions(r)) {
        const resolver = r as ResolverWithOptions;
        return this.moduleRef.get(resolver.use);
      }
      return this.moduleRef.get(r as Type<I18nResolver>);
    }
    return r as I18nResolver;
  }
}
