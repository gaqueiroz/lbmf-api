import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule } from '@nestjs/common';

import * as dotenv from 'dotenv';

dotenv.config();

export class DatabaseModule {
  public static forRoot(): DynamicModule {
    return TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: Number(process.env.DATABASE_PORT),
      autoLoadEntities: true,
      options: {
        encrypt: false,
        enableArithAbort: true,
      },
      migrations: ['dist/src/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: true,
    });
  }

  public static forFeature(
    entity: EntityClassOrSchema | EntityClassOrSchema[]
  ): DynamicModule {
    return TypeOrmModule.forFeature(Array.isArray(entity) ? entity : [entity]);
  }
}
