import { HttpStatus, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UsersService } from '~/users/users.service';
import { User } from '~/users/entities/user.entity';
import { TokensService } from '~/tokens/tokens.service';
import { Token } from '~/tokens/token.entity';
import { RefreshTokenRequestDTO } from '~/tokens/dtos/refresh-token-request.dto';
import { decodeBasicAuthenticationToken } from '~/shared/utils/decode-basic-authtentication-token.util';
import { AppError } from '~/shared/errors/app.error';

import { SignInGrantTypeEnum } from './enums/signin-grant-type.enum';
import { SignUpResponseDTO } from './dtos/signup-response.dto';
import { SignUpRequestDTO } from './dtos/signup-request.dto';
import { SignInResponseDTO } from './dtos/signin-response.dto';
import { SignInRequestDTO } from './dtos/signin-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService
  ) {}

  private async sendAccountCreationMessages(createdUser: User): Promise<void> {
    // mensagem de conta criada com sucesso
  }

  public async signIn(
    data: SignInRequestDTO,
    basicAuthenticationToken: string
  ): Promise<SignInResponseDTO> {
    const availableSignInTypes = Object.values(SignInGrantTypeEnum);
    const availableSignInTypesString =
      Object.values(SignInGrantTypeEnum).join(', ');

    if (!data.grantType) {
      throw new AppError(HttpStatus.BAD_REQUEST, {
        message: `The sign in grant type is required. Available types: ${availableSignInTypesString}.`,
        displayMessage: `O tipo do login é obrigatório. Tipos disponíveis: ${availableSignInTypesString}.`,
      });
    }

    const signInTypeIsValid = availableSignInTypes.includes(data.grantType);

    if (!signInTypeIsValid) {
      throw new AppError(HttpStatus.UNPROCESSABLE_ENTITY, {
        message: `The sign in grant type is invalid. Available types: ${availableSignInTypesString}.`,
        displayMessage: `O tipo do login está inválido. Tipos disponíveis: ${availableSignInTypesString}.`,
      });
    }

    if (!basicAuthenticationToken) {
      const message =
        data.grantType === SignInGrantTypeEnum.client_credentials
          ? 'The Client ID and Client Secret are required.'
          : 'The e-mail and password are required.';
      const displayMessage =
        data.grantType === SignInGrantTypeEnum.client_credentials
          ? 'O Client ID e Client Secret são obrigatórios.'
          : 'O e-mail e senha são obrigatórios.';

      throw new AppError(HttpStatus.BAD_REQUEST, { message, displayMessage });
    }

    const { username, password } = decodeBasicAuthenticationToken(
      basicAuthenticationToken
    );

    if (!username && !password) {
      const message =
        data.grantType === SignInGrantTypeEnum.client_credentials
          ? 'The Client ID and Client Secret are required.'
          : 'The e-mail and password are required.';
      const displayMessage =
        data.grantType === SignInGrantTypeEnum.client_credentials
          ? 'O Client ID e Client Secret são obrigatórios.'
          : 'O e-mail e senha são obrigatórios.';

      throw new AppError(HttpStatus.BAD_REQUEST, { message, displayMessage });
    }

    if (!username) {
      const message =
        data.grantType === SignInGrantTypeEnum.client_credentials
          ? 'The Client ID is required.'
          : 'The e-email is required.';
      const displayMessage =
        data.grantType === SignInGrantTypeEnum.client_credentials
          ? 'O Client ID é obrigatório.'
          : 'O e-mail é obrigatório.';

      throw new AppError(HttpStatus.BAD_REQUEST, { message, displayMessage });
    }

    if (!password) {
      const message =
        data.grantType === SignInGrantTypeEnum.client_credentials
          ? 'The Client Secret is required.'
          : 'The password is required.';
      const displayMessage =
        data.grantType === SignInGrantTypeEnum.client_credentials
          ? 'O Client Secret é obrigatório.'
          : 'A senha é obrigatório.';

      throw new AppError(HttpStatus.BAD_REQUEST, { message, displayMessage });
    }

    let user: User | null = null;

    if (data.grantType === SignInGrantTypeEnum.user_credentials) {
      user = await this.usersService.findByUsername(username);

      if (!user) {
        throw new AppError(HttpStatus.UNAUTHORIZED, {
          message: 'The user e-mail and/or password are/is incorrect.',
          displayMessage:
            'O e-mail e/ou senha do usuário estão/está incorreto(s).',
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.Password);

      if (!isPasswordCorrect) {
        throw new AppError(HttpStatus.UNAUTHORIZED, {
          message: 'The user e-mail and/or password is/are incorrect.',
          displayMessage:
            'O e-mail e/ou senha do usuário está(ão) incorreto(s).',
        });
      }
    }

    delete user.Password;

    const token = await this.tokensService.save({ userId: user.Id });

    return {
      user,
      accessToken: token.AccessToken,
      refreshToken: token.RefreshToken,
    };
  }

  public async signUp(data: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    let createdUser: User = null;

    try {
      if (Object.values(data.user || {}).length === 0) {
        throw new AppError(HttpStatus.BAD_REQUEST, {
          message: 'You need to inform user data.',
          displayMessage: 'Você precisa informar os dados do usuário.',
        });
      }

      console.log('before creation...');
      createdUser = await this.usersService.create(data.user);
      console.log('after creation...');

      await this.sendAccountCreationMessages(createdUser);

      return { user: createdUser };
    } catch (error) {
      if (createdUser?.Id) {
        await this.usersService.delete(createdUser.Id);
      }

      throw error;
    }
  }

  public async refreshToken(data: RefreshTokenRequestDTO): Promise<Token> {
    return await this.tokensService.refresh(data.refreshToken);
  }
}
