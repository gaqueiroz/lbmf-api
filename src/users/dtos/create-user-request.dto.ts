import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserRequestDTO {
  @ApiProperty({ description: 'ID da categoria' })
  CategoryId: number;

  @ApiProperty({ description: '' })
  Username: string;

  @ApiProperty({ description: '' })
  Name: string;

  @ApiProperty({ description: '' })
  Phone: string;

  @ApiPropertyOptional({ description: '' })
  Email?: string;

  @ApiPropertyOptional({ description: '' })
  FacebookKey?: string;

  @ApiPropertyOptional({ description: '' })
  GoogleKey?: string;

  @ApiProperty({ description: '' })
  Password: string;

  @ApiPropertyOptional({ description: '' })
  Bio?: string;

  @ApiPropertyOptional({ description: '' })
  ImageUrl?: string;

  @ApiPropertyOptional({ description: '' })
  ProfessionalUrl?: string;

  @ApiPropertyOptional({ description: '' })
  Instagram?: string;

  @ApiPropertyOptional({ description: '' })
  Followers?: number;

  @ApiPropertyOptional({ description: '' })
  Followings?: number;

  @ApiPropertyOptional({ description: '' })
  IsValid?: boolean;

  @ApiPropertyOptional({ description: '' })
  Birthdate?: Date;

  @ApiPropertyOptional({ description: '' })
  TwofaType?: number;
}
