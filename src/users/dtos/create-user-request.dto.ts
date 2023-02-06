import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserRequestDTO {
  @ApiProperty({ description: 'ID da categoria' })
  CategoryId: number;

  @ApiProperty({ description: 'Username' })
  Username: string;

  @ApiProperty({ description: 'Nome' })
  Name: string;

  @ApiProperty({ description: 'Telefone' })
  Phone: string;

  @ApiPropertyOptional({ description: 'Email' })
  Email?: string;

  @ApiPropertyOptional({ description: 'Chave de autenticação do Facebook' })
  FacebookKey?: string;

  @ApiPropertyOptional({ description: 'Chave de autenticação do Google' })
  GoogleKey?: string;

  @ApiProperty({ description: 'Senha' })
  Password: string;

  @ApiPropertyOptional({ description: 'Bio' })
  Bio?: string;

  @ApiPropertyOptional({ description: 'URL Foto de perfil' })
  ImageUrl?: string;

  @ApiPropertyOptional({ description: 'URL do perfil professional' })
  ProfessionalUrl?: string;

  @ApiPropertyOptional({ description: 'Instagram' })
  Instagram?: string;

  @ApiPropertyOptional({ description: 'Seguidores' })
  Followers?: number;

  @ApiPropertyOptional({ description: 'Seguindo' })
  Followings?: number;

  @ApiPropertyOptional({ description: 'É valido' })
  IsValid?: boolean;

  @ApiPropertyOptional({ description: 'Data de nascimento' })
  Birthdate?: Date;

  @ApiPropertyOptional({ description: 'Autenticação de 2 fatores' })
  TwofaType?: number;
}
