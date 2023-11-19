import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
  @ApiProperty({ nullable: true })
  id: string;

  @ApiProperty({ required: false, nullable: true })
  email: string;

  @Exclude()
  password: string | null;

  roles: $Enums.E_UserRole[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
