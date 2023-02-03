import {
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { IRouteDecoratorRequest } from '../interfaces/route-decorator-request.interface';

export function PostRoute({
  type,
  path = '/',
  summary = 'Criação',
  statusCode = HttpStatus.CREATED,
  excludeEndpoint = false,
}: IRouteDecoratorRequest): MethodDecorator {
  return applyDecorators(
    Post(path),
    HttpCode(statusCode),
    ApiOperation({ summary }),
    ApiExcludeEndpoint(excludeEndpoint),
    ...(type ? [ApiCreatedResponse({ type })] : [])
  );
}
