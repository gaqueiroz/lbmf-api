import { ApiProperty } from '@nestjs/swagger';

export class SignInUserLoginRequestDTO {
  @ApiProperty({ description: 'Localização' })
  location: string;

  @ApiProperty({ description: 'IP' })
  ip: string;

  @ApiProperty({ description: 'Dispositivo' })
  device: string;
}
