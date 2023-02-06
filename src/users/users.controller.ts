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

import { UsersService } from './users.service';
import { USERS_DOC_TITLE, USERS_ROUTE } from './users.constants';
import { User } from './entities/user.entity';
import { UpdateUserRequestDTO } from './dtos/update-user-request.dto';
import { CreateUserRequestDTO } from './dtos/create-user-request.dto';

@Controller(USERS_ROUTE, USERS_DOC_TITLE)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  @GetRoute({ type: [User] })
  public async index(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @PostRoute({ type: User })
  public async store(@Body() body: CreateUserRequestDTO): Promise<User> {
    return await this.usersService.create(body);
  }

  @PutRoute({ type: User })
  public async update(@Body() body: UpdateUserRequestDTO): Promise<User> {
    return await this.usersService.update(body);
  }

  @ShowRoute({ type: User })
  public async show(
    @Param() params: IdRequestParams,
    @Headers('authorization') bearerToken: string
  ): Promise<User> {
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
