import { ApiProperty } from '@nestjs/swagger';

import { User } from '~/users/entities/user.entity';
import { UserSetting } from '~/users/entities/user-settings.entity';

export class SignInResponseDTO {
  @ApiProperty({ description: 'Dados do usuário logado' })
  user: User;

  @ApiProperty({ description: 'Configurações do usuário' })
  userSettings: UserSetting;

  @ApiProperty({ description: 'Token de acesso' })
  accessToken: string;

  @ApiProperty({ description: 'Token de atualização' })
  refreshToken: string;
}
