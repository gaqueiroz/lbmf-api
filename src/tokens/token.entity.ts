import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { User } from '~/users/entities/user.entity';
import { BaseModel } from '~/shared/models/base.model';
import { Column } from '~/shared/decorators/column.decorator';

import { TOKENS_TABLE } from './tokens.constants';

@Entity({ name: TOKENS_TABLE })
export class Token extends BaseModel {
  @Column()
  RefreshToken: string;

  @Column()
  AccessToken: string;

  @Column()
  UserId: number;

  @Column()
  ExpiresAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserId', referencedColumnName: 'Id' })
  user: User;
}
