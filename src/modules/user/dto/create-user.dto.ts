import { ApiProperty } from '@nestjs/swagger';
import { E_UserRole } from '@prisma/client';
import {
  MinLength,
  IsEmail,
  MaxLength,
  IsEnum,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: false, example: 'mail@mail.com' })
  email: string;

  // @MinLength(6, {
  //   message:
  //     'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  // })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  @ApiProperty({ required: false, example: 'password' })
  password: string;

  @ApiProperty({ example: 'Maksym' })
  name?: string;

  @IsPhoneNumber()
  @ApiProperty({ example: '+380777777777' })
  phone?: string;

  @IsEnum(E_UserRole)
  @ApiProperty({
    enum: E_UserRole,
    example: E_UserRole.USER,
  })
  role?: E_UserRole;
}
