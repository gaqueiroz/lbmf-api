import { Entity } from 'typeorm';

import { BaseModel } from '~/shared/models/base.model';
import { Column } from '~/shared/decorators/column.decorator';

import { USERS_CATEGORIES_TABLE } from '../users.constants';

@Entity({ name: USERS_CATEGORIES_TABLE })
export class UsersCategory extends BaseModel {
  @Column({ description: 'Nome', length: 30 })
  name: string;
}
