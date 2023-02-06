import { ApiProperty } from '@nestjs/swagger';

import { User } from '~/users/entities/user.entity';

export class SignUpResponseDTO {
  @ApiProperty({ description: 'Dados do usuário', type: User })
  user: User;
}
