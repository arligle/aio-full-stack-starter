import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { IAccessTokenPayload } from '../vo/payload';

export const CurrentUser = createParamDecorator<IAccessTokenPayload>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
