import { Entity } from 'typeorm';

import { BaseModel } from '~/shared/models/base.model';
import { Column } from '~/shared/decorators/column.decorator';

import { USER_LOGINS_TABLE } from '../users.constants';

@Entity({ name: USER_LOGINS_TABLE })
export class UserLogin extends BaseModel {
  @Column({ description: 'ID do usuário' })
  UserId: number;

  @Column({ description: 'Data de criação' })
  Date: Date;

  @Column({ description: 'Localização', length: 50 })
  Location: string;

  @Column({ description: 'IP', length: 20 })
  Ip: string;

  @Column({ description: 'Dispositivo', length: 30 })
  DeviceDescription: string;
}
