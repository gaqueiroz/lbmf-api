import { HttpStatus } from '@nestjs/common';

import { TClassType } from '../types/TClassType';

export interface IRouteDecoratorRequest {
  type?: string | TClassType | [TClassType];
  summary?: string;
  path?: string;
  statusCode?: HttpStatus;
  excludeEndpoint?: boolean;
  redirect?: string;
}
