import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import * as crypto from 'crypto';

import { UsersService } from '~/users/users.service';
import { ITokenPayload } from '~/tokens/interfaces/token-payload.interface';
import { AppError } from '~/shared/errors/app.error';

import { generateExpirationDate } from './utils/generate-expiration-time.util';
import { Token } from './token.entity';
import { TokenRequestDTO } from './dtos/token-request.dto';
import { RefreshTokenRequestDTO } from './dtos/refresh-token-request.dto';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private async findById(id: number): Promise<Token> {
    return await this.tokenRepository.findOne({
      where: { Id: id },
      relations: ['user'],
    });
  }

  public async save({ userId }: TokenRequestDTO): Promise<Token> {
    const findUser = await this.usersService.findById(userId);

    if (!findUser) {
      throw new AppError(HttpStatus.NOT_FOUND, {
        message: 'User not found',
        tag: 'USER_NOT_FOUND',
      });
    }

    const findToken = await this.tokenRepository.findOneBy({ UserId: userId });

    const payload: ITokenPayload = {
      userId: findUser.Id,
      userName: findUser.Name,
      username: findUser.Username,
      userEmail: findUser.Email,
      userPhoneNumber: findUser.Phone,
    };

    const accessToken = this.jwtService.sign(payload);

    const expiresAt = generateExpirationDate();

    if (findToken) {
      await this.tokenRepository.update(
        { Id: findToken.Id },
        {
          UserId: findToken.UserId,
          ExpiresAt: expiresAt,
          AccessToken: accessToken,
        }
      );

      const updatedToken = await this.findById(findToken.Id);

      return updatedToken;
    }

    const refreshToken = crypto.randomBytes(20).toString('hex');

    const createdToken = await this.tokenRepository.save({
      AccessToken: accessToken,
      RefreshToken: refreshToken,
      UserId: userId,
      ExpiresAt: expiresAt,
    } as Token);

    return createdToken;
  }

  public async refresh(data: RefreshTokenRequestDTO): Promise<Token> {
    const findToken = await this.tokenRepository.findOneBy({
      RefreshToken: data.refreshToken,
    });

    if (!findToken) {
      throw new AppError(HttpStatus.NOT_FOUND, {
        message: 'Token not found',
        tag: 'TOKEN_NOT_FOUND',
      });
    }

    await this.usersService.createLoginHistory(findToken.UserId, data);

    return await this.save({ userId: findToken.UserId });
  }
}
