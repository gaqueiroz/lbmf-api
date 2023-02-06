import { SetMetadata } from '@nestjs/common';

import { IS_PRIVATE_ROUTE_KEY } from '~/auth/auth.constants';

export const PrivateRoute = (): MethodDecorator =>
  SetMetadata(IS_PRIVATE_ROUTE_KEY, true);
