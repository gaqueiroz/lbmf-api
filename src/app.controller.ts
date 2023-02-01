import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @ApiExcludeEndpoint()
  @Redirect('/docs')
  public async docs(): Promise<void> {
    return;
  }
}
