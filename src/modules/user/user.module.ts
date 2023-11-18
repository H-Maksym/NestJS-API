import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { DatabaseModule } from '@database/database.module';
import { PasswordService } from '@modules/password/password.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserRepository, UserService, PasswordService],
})
export class UserModule {}
