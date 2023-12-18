import { IsPasswordsMatchingConstraint } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

export class SignUpDto {
  @IsEmail(
    { allow_utf8_local_part: false },
    {
      message: 'Invalid email format. Please enter a valid email address',
    }
  )
  @IsNotEmpty({ message: 'Field "email" is required' })
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @MinLength(6, {
    message:
      'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(15, {
    message:
      'Password is too long. Max length is $constraint1 characters, but actual is $value',
  })
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'Field "password" is required' })
  @ApiProperty({ example: 'password' })
  password: string;

  @IsString({ message: 'repeatPassword must be a string' })
  @Validate(IsPasswordsMatchingConstraint)
  @IsNotEmpty({ message: 'Field "passwordRepeat" is required' })
  @ApiProperty({ example: 'password' })
  passwordRepeat: string;
}
