import { HttpException, HttpStatus } from '@nestjs/common';

export interface AppErrorData {
  tag?: string;
  displayMessage?: string;
  message: string;
  metadata?: Record<string, any>;
}

export class AppError {
  status: HttpStatus;

  data: AppErrorData | AppErrorData[];

  constructor(status: HttpStatus, data: AppErrorData | AppErrorData[]) {
    throw new HttpException(data, status);
  }
}
