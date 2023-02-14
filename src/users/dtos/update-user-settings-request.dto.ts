import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserSetttingsRequestDTO {
  @ApiPropertyOptional({ description: 'Linguagem' })
  Language: string;

  @ApiPropertyOptional({ description: 'Perfil privado' })
  ProfilePrivacy: boolean;

  @ApiPropertyOptional({ description: 'Privacidade de comentários' })
  CommentsPrivacy: boolean;

  @ApiPropertyOptional({ description: 'Privavidade de menções' })
  MentionsPrivacy: boolean;

  @ApiPropertyOptional({ description: 'Privavidade de Temps' })
  TempsPrivacy: boolean;

  @ApiPropertyOptional({ description: 'Privavidade de mensagens' })
  MessagesPrivacy: boolean;

  @ApiPropertyOptional({ description: 'Privacidade de geolocalização' })
  GeolocationPrivacy: boolean;

  @ApiPropertyOptional({ description: 'Geolicalização' })
  GeolocationRadius: string;

  @ApiPropertyOptional({ description: 'Privacidade de comentários' })
  CommentsNotification: boolean;

  @ApiPropertyOptional({ description: 'Privacidade de likes' })
  LikesNotification: boolean;

  @ApiPropertyOptional({ description: 'Privacidade de mensafgens' })
  MessagesNotification: boolean;
}
