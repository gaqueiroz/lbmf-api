import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  applyDecorators,
  Get,
  HttpCode,
  HttpStatus,
  Redirect,
} from '@nestjs/common';

import { IRouteDecoratorRequest } from '../interfaces/route-decorator-request.interface';

export function GetRoute({
  type,
  path = '/',
  summary = 'Listagem',
  statusCode = HttpStatus.OK,
  excludeEndpoint = false,
  redirect = '',
}: IRouteDecoratorRequest): MethodDecorator {
  return applyDecorators(
    Get(path),
    HttpCode(statusCode),
    ApiOperation({ summary }),
    ApiExcludeEndpoint(excludeEndpoint),
    ...(type ? [ApiOkResponse({ type })] : []),
    ...(redirect ? [Redirect(redirect)] : [])
  );
}
