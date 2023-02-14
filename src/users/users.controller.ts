import { JwtService } from '@nestjs/jwt';
import { Body, Param, Headers, HttpStatus } from '@nestjs/common';

import { verifyJWT } from '~/shared/utils/verfiy-jwt.util';
import { IdRequestParams } from '~/shared/params/id-request.params';
import { AppError } from '~/shared/errors/app.error';
import { ShowRoute } from '~/shared/decorators/show-route.decorator';
import { PutRoute } from '~/shared/decorators/put-route.decorator';
import { PostRoute } from '~/shared/decorators/post-route.decorator';
import { GetRoute } from '~/shared/decorators/get-route.decorator';
import { Controller } from '~/shared/decorators/controller.decorator';
import { PrivateRoute } from '~/auth/decorators/private-route.decorator';

import { UsersService } from './users.service';
import { USERS_DOC_TITLE, USERS_ROUTE } from './users.constants';
import { KeyRequestParams } from './params/key-request.params';
import { User as UserEntity } from './entities/user.entity';
import { UserSetting } from './entities/user-settings.entity';
import { UpdateUserSetttingsRequestDTO } from './dtos/update-user-settings-request.dto';
import { UpdateUserRequestDTO } from './dtos/update-user-request.dto';
import { CreateUserRequestDTO } from './dtos/create-user-request.dto';

@Controller(USERS_ROUTE, USERS_DOC_TITLE)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  @PrivateRoute()
  @GetRoute({ type: [UserEntity] })
  public async index(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @PrivateRoute()
  @PostRoute({ type: UserEntity })
  public async store(@Body() body: CreateUserRequestDTO): Promise<UserEntity> {
    return await this.usersService.create(body);
  }

  @PrivateRoute()
  @PutRoute({ path: '/key/:key', type: UserEntity })
  public async update(
    @Param() params: KeyRequestParams,
    @Body() body: UpdateUserRequestDTO,
    @Headers('authorization') bearerToken: string
  ): Promise<UserEntity> {
    const decodedToken = await verifyJWT(bearerToken, this.jwtService);

    return await this.usersService.update(
      decodedToken.userId,
      params.key,
      body
    );
  }

  @PrivateRoute()
  @PutRoute({
    type: UserSetting,
    path: '/key/:key/settings',
    summary: 'Alterar configurações do usuário',
  })
  public async updateSettings(
    @Param() params: KeyRequestParams,
    @Body() body: UpdateUserSetttingsRequestDTO,
    @Headers('authorization') bearerToken: string
  ): Promise<UserSetting> {
    const decodedToken = await verifyJWT(bearerToken, this.jwtService);

    return await this.usersService.updateSettings(
      decodedToken.userId,
      params.key,
      body
    );
  }

  @PrivateRoute()
  @ShowRoute({ type: UserEntity })
  public async show(
    @Param() params: IdRequestParams,
    @Headers('authorization') bearerToken: string
  ): Promise<UserEntity> {
    const decodedToken = await verifyJWT(bearerToken, this.jwtService);

    const user = await this.usersService.findById(params.id);

    if (user.Id !== decodedToken.userId) {
      throw new AppError(HttpStatus.FORBIDDEN, {
        message: "You don't have access to this user.",
        displayMessage: 'Você não tem acesso a esse usuário.',
      });
    }

    return user;
  }
}
