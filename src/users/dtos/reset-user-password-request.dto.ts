import { ApiProperty } from '@nestjs/swagger';

export class ResetUserPasswordRequestDTO {
  @ApiProperty({ description: 'Nova senha' })
  newPassword: string;

  @ApiProperty({ description: 'Código' })
  passwordRecoveryCode: string;
}
