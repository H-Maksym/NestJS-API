import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ required: false, example: 'test@test.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ required: false, example: 'password' })
  password: string;
}
