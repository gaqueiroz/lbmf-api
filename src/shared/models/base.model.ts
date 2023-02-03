import { ApiProperty } from '@nestjs/swagger';

import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseModel {
  @ApiProperty({ description: 'ID' })
  @PrimaryGeneratedColumn('increment')
  Id: number;
}
