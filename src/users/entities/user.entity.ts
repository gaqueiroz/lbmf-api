import * as uuid from 'uuid';
import { CreateDateColumn, Entity } from 'typeorm';

import { BaseModel } from '~/shared/models/base.model';
import { Column } from '~/shared/decorators/column.decorator';

import { USERS_TABLE } from '../users.constants';

@Entity({ name: USERS_TABLE })
export class User extends BaseModel {
  @Column({ description: 'Chave UUID', default: uuid.v4, length: 50 })
  Key: string;

  @Column({ description: 'ID da categoria' })
  CategoryId: number;

  @Column({ description: '', length: 30 })
  Username: string;

  @Column({ description: '', length: 100 })
  Name: string;

  @Column({ description: '', length: 20 })
  Phone: string;

  @Column({ description: '', length: 50, nullable: true })
  Email?: string;

  @Column({ description: '', length: 200, nullable: true })
  FacebookKey?: string;

  @Column({ description: '', length: 500, nullable: true })
  GoogleKey?: string;

  @Column({ description: '', length: 60 })
  Password: string;

  @Column({ description: '', length: 400, nullable: true })
  Bio?: string;

  @Column({ description: '', length: 50, nullable: true })
  ImageUrl?: string;

  @Column({ description: '', length: 50, nullable: true })
  ProfessionalUrl?: string;

  @Column({ description: '', length: 30, nullable: true })
  Instagram?: string;

  @Column({ description: '', nullable: true })
  Followers?: number;

  @Column({ description: '', nullable: true })
  Followings?: number;

  @Column({ description: '', nullable: true })
  IsValid?: boolean;

  @CreateDateColumn({ default: new Date() })
  CreateDate?: Date;

  @Column({ description: '', nullable: true })
  Birthdate?: Date;

  @Column({ description: '', nullable: true })
  TwofaType?: number;

  @Column()
  PasswordRecoveryCode: string;

  @Column()
  PasswordRecoveryExpirationDate: Date;
}
