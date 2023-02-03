import { Entity } from 'typeorm';

import { BaseModel } from '~/shared/models/base.model';
import { Column } from '~/shared/decorators/column.decorator';

import { USER_SETTINGS_TABLE } from '../users.constants';

@Entity({ name: USER_SETTINGS_TABLE })
export class UserSettings extends BaseModel {
  @Column()
  UserId: number;

  @Column({ length: 20 })
  Language: string;

  @Column()
  ProfilePrivacy: number;

  @Column()
  CommentsPrivacy: number;

  @Column()
  MentionsPrivacy: number;

  @Column()
  TempsPrivacy: number;

  @Column()
  MessagesPrivacy: number;

  @Column({ length: 50 })
  GeolocationPrivacy: string;

  @Column()
  GeolocationRadius: string;

  @Column()
  CommentsNotification: number;

  @Column()
  LikesNotification: number;

  @Column()
  MessagesNotification: number;
}
