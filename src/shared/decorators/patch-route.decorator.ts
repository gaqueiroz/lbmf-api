import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators, HttpCode, HttpStatus, Patch } from '@nestjs/common';

import { IRouteDecoratorRequest } from '../interfaces/route-decorator-request.interface';

export function PatchRoute({
  type,
  path = '/:id',
  summary = 'Alteração',
  statusCode = HttpStatus.OK,
  excludeEndpoint = false,
}: IRouteDecoratorRequest): MethodDecorator {
  return applyDecorators(
    Patch(path),
    HttpCode(statusCode),
    ApiOperation({ summary }),
    ApiExcludeEndpoint(excludeEndpoint),
    ...(type ? [ApiOkResponse({ type })] : [])
  );
}
