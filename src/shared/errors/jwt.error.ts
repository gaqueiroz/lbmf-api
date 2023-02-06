/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpStatus } from '@nestjs/common';

import { AppError } from './app.error';

export class JWTError {
  constructor(error: any) {
    let message = '';
    let displayMessage = '';

    if (error?.name === 'JsonWebTokenError') {
      message = "The informed access token it's invalid.";
      displayMessage = 'O token de acesso informado está inválido.';
    } else if (error?.name === 'TokenExpiredError') {
      message = 'The informed access token has expired.';
      displayMessage = 'O token de acesso informado expirou.';
    } else {
      message = 'The access token is required.';
      displayMessage = 'O token de acesso é obrigatório.';
    }

    throw new AppError(HttpStatus.UNAUTHORIZED, {
      message,
      displayMessage,
    });
  }
}
