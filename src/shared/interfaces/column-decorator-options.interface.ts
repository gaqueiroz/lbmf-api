import { ColumnOptions } from 'typeorm';

import { TClassType } from '../types/TClassType';

export interface IColumnDecoratorOptions extends ColumnOptions {
  docType?: string | TClassType | [TClassType];
  description?: string;
}
