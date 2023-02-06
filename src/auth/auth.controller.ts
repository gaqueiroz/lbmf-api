import { ApiConflictResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Param, Headers, HttpStatus, Body } from '@nestjs/common';

import { UsersService } from '~/users/users.service';
import { User } from '~/users/entities/user.entity';
import { ResetUserPasswordRequestDTO } from '~/users/dtos/reset-user-password-request.dto';
import { Token } from '~/tokens/token.entity';
import { RefreshTokenRequestDTO } from '~/tokens/dtos/refresh-token-request.dto';
import { verifyJWT } from '~/shared/utils/verfiy-jwt.util';
import { IdRequestParams } from '~/shared/params/id-request.params';
import { BaseHeaders } from '~/shared/headers/base.headers';
import { AppError } from '~/shared/errors/app.error';
import { ShowRoute } from '~/shared/decorators/show-route.decorator';
import { PostRoute } from '~/shared/decorators/post-route.decorator';
import { Controller } from '~/shared/decorators/controller.decorator';

import { SignUpResponseDTO } from './dtos/signup-response.dto';
import { SignUpRequestDTO } from './dtos/signup-request.dto';
import { SignInResponseDTO } from './dtos/signin-response.dto';
import { SignInRequestDTO } from './dtos/signin-request.dto';
import { AuthService } from './auth.service';
import { AUTH_DOC_TITLE, AUTH_ROUTE } from './auth.constants';

@Controller(AUTH_ROUTE, AUTH_DOC_TITLE)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @PostRoute({
    type: SignInResponseDTO,
    path: '/signin',
    summary: 'Entrar',
    statusCode: HttpStatus.OK,
  })
  public async signIn(
    @Body() body: SignInRequestDTO,
    @Headers() headers: BaseHeaders
  ): Promise<SignInResponseDTO> {
    return await this.authService.signIn(body, headers.authorization);
  }

  @ApiConflictResponse({
    description:
      'Erro quando já existe um usuário com o telefone, e-mail ou CPF/CNPJ informado',
  })
  @PostRoute({
    type: User,
    path: '/signup',
    summary: 'Cadastrar',
  })
  public async signUp(
    @Body() body: SignUpRequestDTO
  ): Promise<SignUpResponseDTO> {
    return await this.authService.signUp(body);
  }

  @PostRoute({
    type: Token,
    summary: 'Revalidar token',
    path: '/refresh-token',
  })
  public async refreshToken(
    @Body() body: RefreshTokenRequestDTO
  ): Promise<Token> {
    return await this.authService.refreshToken(body);
  }

  @PostRoute({
    path: '/reset-password',
    summary: 'Resetar a senha',
    statusCode: HttpStatus.NO_CONTENT,
  })
  public async resetPassword(
    @Body() body: ResetUserPasswordRequestDTO
  ): Promise<void> {
    return await this.usersService.resetPassword({
      ...body,
      passwordRecoveryCode: body.passwordRecoveryCode.toUpperCase(),
    });
  }
}
