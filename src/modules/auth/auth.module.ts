import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserModule } from '@modules/user/user.module';
import { DatabaseModule } from '@database/database.module';

import { jwtModuleAsyncOptions } from '@config';
import { AuthRepository } from './repository/auth.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  imports: [
    ConfigModule,
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions()),
    UserModule,
  ],
})
export class AuthModule {}
