import { IsPasswordsMatchingConstraint } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Validate } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @ApiProperty({ required: false, example: 'test@test.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ required: false, example: '1234' })
  password: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ required: false, example: '1234' })
  @Validate(IsPasswordsMatchingConstraint)
  passwordRepeat: string;
}
