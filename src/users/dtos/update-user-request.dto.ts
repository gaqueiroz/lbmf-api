import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserRequestDTO {
  @ApiPropertyOptional({ description: 'ID da categoria' })
  CategoryId?: number;

  @ApiPropertyOptional({ description: 'Username' })
  Username?: string;

  @ApiPropertyOptional({ description: 'Nome' })
  Name?: string;

  @ApiPropertyOptional({ description: 'Telefone' })
  Phone?: string;

  @ApiPropertyOptional({ description: 'Email' })
  Email?: string;

  @ApiPropertyOptional({ description: 'Chavbe ' })
  FacebookKey?: string;

  @ApiPropertyOptional({ description: 'Chave do Google' })
  GoogleKey?: string;

  @ApiPropertyOptional({ description: 'Senha' })
  Password: string;

  @ApiPropertyOptional({ description: 'Bio' })
  Bio?: string;

  @ApiPropertyOptional({ description: 'URL de foto de perfil' })
  ImageUrl?: string;

  @ApiPropertyOptional({
    description: 'URL do perfil professional',
  })
  ProfessionalUrl?: string;

  @ApiPropertyOptional({ description: 'Instagram' })
  Instagram?: string;

  @ApiPropertyOptional({ description: 'Seguidores', nullable: true })
  Followers?: number;

  @ApiPropertyOptional({ description: 'Seguindo', nullable: true })
  Followings?: number;

  @ApiPropertyOptional({ description: 'É válido', nullable: true })
  IsValid?: boolean;

  @ApiPropertyOptional({ description: 'Data de criação' })
  CreateDate?: Date;

  @ApiPropertyOptional({ description: 'Data de nascimento', nullable: true })
  Birthdate?: Date;

  @ApiPropertyOptional({
    description: 'Autenticação em 2 fatores',
    nullable: true,
  })
  TwofaType?: number;
}
