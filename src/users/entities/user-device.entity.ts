import { ApiProperty } from '@nestjs/swagger';

import * as uuid from 'uuid';
import { Entity } from 'typeorm';

import { BaseModel } from '~/shared/models/base.model';
import { Column } from '~/shared/decorators/column.decorator';

import { USER_DEVICES_TABLE } from '../users.constants';

@Entity({ name: USER_DEVICES_TABLE })
export class UserDevice extends BaseModel {
  @Column({ default: uuid.v4, length: 50, description: 'Chave' })
  Key: string;

  @Column({ description: '' })
  UserId: number;

  @Column({ description: '', length: 50 })
  Name: string;

  @Column({ description: '', length: 20 })
  Type: string;

  @Column({ description: '', length: 20 })
  Model: string;

  @Column({ description: '', length: 50 })
  Location: string;

  @Column({ description: '' })
  CreateDate: Date;
}
