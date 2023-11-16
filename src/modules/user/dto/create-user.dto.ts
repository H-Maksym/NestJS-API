import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: false })
  email: string;
  
  @ApiProperty({ required: false })
  password: string;
  
  @ApiProperty()
  name?: string;

  @ApiProperty()
  phone: string;
}
