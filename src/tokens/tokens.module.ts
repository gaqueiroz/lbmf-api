import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { UsersModule } from '~/users/users.module';
import { DatabaseModule } from '~/database/database.module';

import { TokensService } from './tokens.service';
import { Token } from './token.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([Token]),
    UsersModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
