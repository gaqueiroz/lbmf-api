import { ApiProperty } from '@nestjs/swagger';

import { SignInUserLoginRequestDTO } from './signin-user-login-request.dto';
import { SignInGrantTypeEnum } from '../enums/signin-grant-type.enum';

export class SignInRequestDTO extends SignInUserLoginRequestDTO {
  @ApiProperty({ description: 'Tipo', enum: SignInGrantTypeEnum })
  grantType: SignInGrantTypeEnum;
}
