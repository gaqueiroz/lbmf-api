import { Entity } from 'typeorm';

import { BaseModel } from '~/shared/models/base.model';
import { Column } from '~/shared/decorators/column.decorator';

import { USER_LOGINS_TABLE } from '../users.constants';

@Entity({ name: USER_LOGINS_TABLE })
export class UserLogin extends BaseModel {
  @Column({ description: '' })
  UserId: number;

  @Column({ description: '' })
  Date: Date;

  @Column({ description: '', length: 50 })
  Location: string;

  @Column({ description: '', length: 20 })
  Ip: string;

  @Column({ description: '', length: 30 })
  DeviceDescription: string;
}
