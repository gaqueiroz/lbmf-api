import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

import { Column as TypeORMColumn } from 'typeorm';

import { IColumnDecoratorOptions } from '../interfaces/column-decorator-options.interface';

export function Column({
  docType,
  description,
  ...columnOptions
}: IColumnDecoratorOptions = {}): PropertyDecorator {
  const apiPropertyOptions: ApiPropertyOptions = {
    ...(typeof columnOptions?.nullable !== 'undefined'
      ? { required: !columnOptions?.nullable }
      : {}),
    ...(description ? { description } : {}),
    ...(docType ? { type: docType } : {}),
    ...(columnOptions?.default
      ? { default: columnOptions.default, required: false }
      : {}),
    ...(columnOptions?.enum ? { enum: columnOptions.enum } : {}),
    ...(columnOptions?.enumName ? { enumName: columnOptions.enumName } : {}),
    ...(Number(columnOptions?.length || 0) > 0
      ? { maxLength: Number(columnOptions.length) }
      : {}),
  };

  const shoudRenderApiProperty = Object.values(apiPropertyOptions).length > 0;

  return applyDecorators(
    TypeORMColumn(columnOptions),
    ...(shoudRenderApiProperty ? [ApiProperty(apiPropertyOptions)] : [])
  );
}
