import { HttpStatus } from '@nestjs/common';

import { GetRoute } from './get-route.decorator';
import { IRouteDecoratorRequest } from '../interfaces/route-decorator-request.interface';

export function ShowRoute({
  type,
  path = '/:id',
  summary = 'Busca pelo ID',
  statusCode = HttpStatus.OK,
  excludeEndpoint = false,
}: IRouteDecoratorRequest): MethodDecorator {
  return GetRoute({
    type,
    path,
    summary,
    statusCode,
    excludeEndpoint,
  });
}
