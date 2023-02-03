import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import * as uuid from 'uuid';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { UpdateUserRequestDTO } from './dtos/update-user-request.dto';
import { CreateUserRequestDTO } from './dtos/create-user-request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async create(data: CreateUserRequestDTO): Promise<User> {
    return this.userRepository.save({
      ...data,
      Key: uuid.v4(),
    });
  }

  public async update(data: UpdateUserRequestDTO): Promise<User> {
    // return this.userRepository.update();
    return;
  }
}
