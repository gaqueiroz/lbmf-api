import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserRequestDTO {
  @ApiPropertyOptional({ description: 'ID da categoria' })
  CategoryId?: number;

  @ApiPropertyOptional({ description: '' })
  Username?: string;

  @ApiPropertyOptional({ description: '' })
  Name?: string;

  @ApiPropertyOptional({ description: '' })
  Phone?: string;

  @ApiPropertyOptional({ description: '' })
  Email?: string;

  @ApiPropertyOptional({ description: '' })
  FacebookKey?: string;

  @ApiPropertyOptional({ description: '' })
  GoogleKey?: string;

  @ApiPropertyOptional({ description: '' })
  Password?: string;

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
