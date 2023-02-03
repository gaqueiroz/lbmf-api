import { Module } from '@nestjs/common';

import { DatabaseModule } from '~/database/database.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersCategory } from './entities/users-category.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [DatabaseModule.forFeature([User, UsersCategory])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
