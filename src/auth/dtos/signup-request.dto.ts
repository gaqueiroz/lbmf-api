import { ApiProperty } from '@nestjs/swagger';

import { CreateUserRequestDTO } from '~/users/dtos/create-user-request.dto';

export class SignUpRequestDTO {
  @ApiProperty({ description: 'Dados do usuário', type: CreateUserRequestDTO })
  user: CreateUserRequestDTO;
}
