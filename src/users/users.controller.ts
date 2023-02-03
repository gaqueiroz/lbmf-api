import { Body } from '@nestjs/common';

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
  constructor(private readonly usersService: UsersService) {}

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
}
