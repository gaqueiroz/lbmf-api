import { Module } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [DatabaseModule.forRoot(), UsersModule, AuthModule, TokensModule],
  controllers: [AppController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
