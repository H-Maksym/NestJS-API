import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  //COMMENT createUser
  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  //COMMENT get all user
  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  //COMMENT get user by id
  async getUser(id: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }

  //COMMENT update user by id
  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({ where: { id }, data });
  }

  //COMMENT delete user by id
  async deleteUser(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
