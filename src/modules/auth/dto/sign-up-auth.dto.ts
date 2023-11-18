import { IsPasswordsMatchingConstraint } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Validate } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @ApiProperty({ required: false, example: 'test@test.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ required: false, example: 'password' })
  password: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ required: false, example: 'password' })
  @Validate(IsPasswordsMatchingConstraint)
  passwordRepeat: string;
}
