import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '~/database/database.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersCategory } from './entities/users-category.entity';
import { User } from './entities/user.entity';
import { UserSettings } from './entities/user-settings.entity';
import { UserLogin } from './entities/user-login.entity';
import { UserDevice } from './entities/user-device.entity';

@Module({
  imports: [
    JwtModule,
    DatabaseModule.forFeature([
      User,
      UsersCategory,
      UserDevice,
      UserSettings,
      UserLogin,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
