import { ApiProperty } from '@nestjs/swagger';

import { SignInGrantTypeEnum } from '../enums/signin-grant-type.enum';

export class SignInRequestDTO {
  @ApiProperty({ description: 'Tipo', enum: SignInGrantTypeEnum })
  grantType: SignInGrantTypeEnum;
}
