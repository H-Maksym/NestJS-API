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
  UseInterceptors,
  ClassSerializerInterceptor,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  // ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { PrismaClientExceptionFilter } from '@database/prisma/prisma-client-exception/prisma-client-exception.filter';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@modules/user/dto';
import { UserResponse } from './responses';
import { E_UserRole, User } from '@prisma/client';
import { CurrentUser, Roles, UUIDParam } from '@common/decorators';
import { IJwtPayload } from '@modules/auth/interfaces';
import { RolesGuard } from '@modules/auth/guards/role.guard';

@ApiTags('🙎‍♂️ user service')
@ApiBearerAuth()
@Controller('user')
//decorator for prisma client error handler
@UseFilters(PrismaClientExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({ summary: '🎭 create user' })
  // @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    const user = await this.userService.create(createUserDto);
    const responseUser = user ? new UserResponse(user) : null;
    return responseUser;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[] | []> {
    const user = await this.userService.findAll();
    const responseUsers = user?.map(user => new UserResponse(user)) || [];
    return responseUsers;
  }

  //COMMENT endpoint only for admin
  @UseGuards(RolesGuard)
  @Roles(E_UserRole.ADMIN)
  @Get('me')
  async getMe(@CurrentUser('id') user: IJwtPayload) {
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.userService.findOneById(user.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User | null> {
    const user = await this.userService.findOneById(id);
    const responseUser = user ? new UserResponse(user) : null;
    return responseUser;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User | null> {
    const user = await this.userService.update(id, updateUserDto);
    const responseUser = user ? new UserResponse(user) : null;
    return responseUser;
  }

  @Delete(':id')
  remove(
    @UUIDParam('id') id: string,
    @CurrentUser() user: IJwtPayload
  ): Promise<{ id: string } | null> {
    return this.userService.remove(id, user);
  }
}

// @Controller('user')
// export class user {
//   @Get()
//   async getAll() {}

//   @Get(':id')
//   async getById() {}

//   @Get('me')
//   async getMe() {}
// }
