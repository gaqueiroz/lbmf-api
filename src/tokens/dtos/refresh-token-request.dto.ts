import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenRequestDTO {
  @ApiProperty({ description: 'Chave de atualização' })
  refreshToken: string;
}
