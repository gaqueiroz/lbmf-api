import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators, HttpCode, HttpStatus, Put } from '@nestjs/common';

import { IRouteDecoratorRequest } from '../interfaces/route-decorator-request.interface';

export function PutRoute({
  type,
  path = '/:id',
  summary = 'Alteração',
  statusCode = HttpStatus.OK,
  excludeEndpoint = false,
}: IRouteDecoratorRequest): MethodDecorator {
  return applyDecorators(
    Put(path),
    HttpCode(statusCode),
    ApiOperation({ summary }),
    ApiExcludeEndpoint(excludeEndpoint),
    ...(type ? [ApiOkResponse({ type })] : [])
  );
}
