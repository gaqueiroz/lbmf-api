import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IUserDecoratorResponse } from '../interfaces/user-decorator-response.interface';

export const User = createParamDecorator<any, any, IUserDecoratorResponse>(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  }
);
