import { ApiProperty } from '@nestjs/swagger';

import { SignInUserLoginRequestDTO } from '~/auth/dtos/signin-user-login-request.dto';

export class RefreshTokenRequestDTO extends SignInUserLoginRequestDTO {
  @ApiProperty({ description: 'Chave de atualização' })
  refreshToken: string;
}
