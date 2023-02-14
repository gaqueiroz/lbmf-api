import { ApiProperty } from '@nestjs/swagger';

export class KeyRequestParams {
  @ApiProperty({ description: 'Código do usuário' })
  key: string;
}
