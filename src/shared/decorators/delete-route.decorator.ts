import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators, Delete, HttpCode, HttpStatus } from '@nestjs/common';

import { IRouteDecoratorRequest } from '../interfaces/route-decorator-request.interface';

export function DeleteRoute({
  type = null,
  path = '/:id',
  summary = 'Exclusão',
  statusCode = HttpStatus.NO_CONTENT,
  excludeEndpoint = false,
}: IRouteDecoratorRequest): MethodDecorator {
  return applyDecorators(
    Delete(path),
    HttpCode(statusCode),
    ApiOperation({ summary }),
    ApiExcludeEndpoint(excludeEndpoint),
    ...(type ? [ApiOkResponse({ type })] : [])
  );
}
