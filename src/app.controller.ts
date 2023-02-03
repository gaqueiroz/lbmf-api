import { Controller } from '@nestjs/common';

import { GetRoute } from './shared/decorators/get-route.decorator';

@Controller()
export class AppController {
  @GetRoute({ path: '/', redirect: '/docs', excludeEndpoint: true })
  public async docs(): Promise<void> {
    return;
  }
}
