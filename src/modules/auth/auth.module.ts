import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserModule } from '@modules/user/user.module';
import { DatabaseModule } from '@database/database.module';

import { jwtModuleAsyncOptions } from '@config';
import { AuthRepository } from './repository/auth.repository';
import { CookieModule } from '@modules/cookie/cookie.module';
import { STRATEGIES } from './strategies';
import { GUARDS } from './guards';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, ...STRATEGIES, ...GUARDS],
  imports: [
    ConfigModule,
    DatabaseModule,
    PassportModule,
    CookieModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions()),
    UserModule,
  ],
})
export class AuthModule {}
