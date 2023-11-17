import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseFilters,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  // ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { PrismaClientExceptionFilter } from '@/database/prisma/prisma-client-exception/prisma-client-exception.filter';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UserEntity } from './entity/user.entity';

@ApiTags('🙎‍♂️ service')
@Controller('user')
//decorator for prisma client error handler
@UseFilters(PrismaClientExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '🎭 create user' })
  // @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
