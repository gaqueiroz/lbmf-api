import { ApiProperty } from '@nestjs/swagger';

export class BaseHeaders {
  @ApiProperty({ description: 'Token de acesso' })
  authorization: string;
}
