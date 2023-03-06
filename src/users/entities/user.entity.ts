import { ApiProperty } from '@nestjs/swagger';

import * as uuid from 'uuid';
import { CreateDateColumn, Entity } from 'typeorm';

import { BaseModel } from '~/shared/models/base.model';
import { Column } from '~/shared/decorators/column.decorator';

import { USERS_TABLE } from '../users.constants';

@Entity({ name: USERS_TABLE })
export class User extends BaseModel {
  @Column({
    description: 'Chave UUID',
    default: uuid.v4,
    length: 50,
    unique: true,
  })
  Key: string;

  @Column({ description: 'ID da categoria' })
  CategoryId: number;

  @Column({ description: 'Username', length: 30 })
  Username: string;

  @Column({ description: 'Nome', length: 100 })
  Name: string;

  @Column({ description: 'Telefone', length: 20 })
  Phone: string;

  @Column({ description: 'Email', length: 50, nullable: true })
  Email?: string;

  @Column({ description: 'Chave do Facebook', length: 200, nullable: true })
  FacebookKey?: string;

  @Column({ description: 'Chave do Google', length: 500, nullable: true })
  GoogleKey?: string;

  @Column({ description: 'Senha', length: 60 })
  Password: string;

  @Column({ description: 'Bio', length: 400, nullable: true })
  Bio?: string;

  @Column({ description: 'URL de foto de perfil', length: 255, nullable: true })
  ImageUrl?: string;

  @Column({
    description: 'URL do perfil professional',
    length: 50,
    nullable: true,
  })
  ProfessionalUrl?: string;

  @Column({ description: 'Instagram', length: 30, nullable: true })
  Instagram?: string;

  @Column({ description: 'Seguidores', nullable: true })
  Followers?: number;

  @Column({ description: 'Seguindo', nullable: true })
  Followings?: number;

  @Column({ description: 'É válido', nullable: true })
  IsValid?: boolean;

  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn({ default: new Date() })
  CreateDate?: Date;

  @Column({ description: 'Data de nascimento', nullable: true })
  Birthdate?: Date;

  @Column({ description: 'Autenticação em 2 fatores', nullable: true })
  TwofaType?: number;

  @Column({ description: 'Código para recuperação de senha' })
  PasswordRecoveryCode: string;

  @Column({
    description: 'Tempo para expiração de código de recuperação de senha',
  })
  PasswordRecoveryExpirationDate: Date;
}
