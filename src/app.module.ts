import { Module } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule.forRoot(), UsersModule],
  controllers: [AppController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
