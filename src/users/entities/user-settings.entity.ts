import { Entity } from 'typeorm';

import { BaseModel } from '~/shared/models/base.model';
import { Column } from '~/shared/decorators/column.decorator';

import { USER_SETTINGS_TABLE } from '../users.constants';

@Entity({ name: USER_SETTINGS_TABLE })
export class UserSetting extends BaseModel {
  @Column()
  UserId: number;

  @Column({ length: 20 })
  Language: string;

  @Column({ description: 'Perfil privado' })
  ProfilePrivacy: boolean;

  @Column({ description: 'Privacidade de comentários' })
  CommentsPrivacy: boolean;

  @Column({ description: 'Privavidade de menções' })
  MentionsPrivacy: boolean;

  @Column({ description: 'Privavidade de Temps' })
  TempsPrivacy: boolean;

  @Column({ description: 'Privavidade de mensagens' })
  MessagesPrivacy: boolean;

  @Column({ description: 'Privacidade de geolocalização' })
  GeolocationPrivacy: boolean;

  @Column({ description: 'Geolicalização' })
  GeolocationRadius: string;

  @Column({ description: 'Privacidade de comentários' })
  CommentsNotification: boolean;

  @Column({ description: 'Privacidade de likes' })
  LikesNotification: boolean;

  @Column({ description: 'Privacidade de mensafgens' })
  MessagesNotification: boolean;
}
