import { ApiProperty } from '@nestjs/swagger';

export class IdRequestParams {
  @ApiProperty({ description: 'ID' })
  id: number;
}
