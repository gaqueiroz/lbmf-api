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

  @Column()
  ProfilePrivacy: boolean;

  @Column()
  CommentsPrivacy: boolean;

  @Column()
  MentionsPrivacy: boolean;

  @Column()
  TempsPrivacy: boolean;

  @Column()
  MessagesPrivacy: boolean;

  @Column()
  GeolocationPrivacy: boolean;

  @Column()
  GeolocationRadius: string;

  @Column()
  CommentsNotification: boolean;

  @Column()
  LikesNotification: boolean;

  @Column()
  MessagesNotification: boolean;
}
