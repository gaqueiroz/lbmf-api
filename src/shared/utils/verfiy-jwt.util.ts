import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common';

import { ITokenPayload } from '~/tokens/interfaces/token-payload.interface';

import { JWTError } from '../errors/jwt.error';
import { AppError } from '../errors/app.error';

export async function verifyJWT(
  bearerToken: string,
  jwtService: JwtService
): Promise<Partial<ITokenPayload>> {
  if (!bearerToken) {
    throw new AppError(HttpStatus.UNAUTHORIZED, {
      message: 'The access token is required.',
      displayMessage: 'O token de acesso é obrigatório.',
    });
  }

  const accessToken = bearerToken.split(' ').pop();
  if (!accessToken) {
    throw new AppError(HttpStatus.UNAUTHORIZED, {
      message: 'The access token is required.',
      displayMessage: 'O token de acesso é obrigatório.',
    });
  }

  try {
    await jwtService.verify(accessToken, {
      secret: process.env.ADMIN_JWT_SECRET,
    });

    const decodedAccessToken = jwtService.decode(accessToken);

    return decodedAccessToken as unknown as ITokenPayload;
  } catch {
    try {
      await jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      const decodedAccessToken = jwtService.decode(accessToken);

      return decodedAccessToken as unknown as ITokenPayload;
    } catch (error) {
      throw new JWTError(error);
    }
  }
}
