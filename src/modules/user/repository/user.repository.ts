import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly db: PrismaService) {}

  //COMMENT createUser
  async createUser(data: CreateUserDto): Promise<User> {
    return this.db.user.create({ data });
  }

  //COMMENT get all user
  async getUsers(): Promise<User[]> {
    return await this.db.user.findMany();
  }

  //COMMENT get user by id
  async getUser(id: string): Promise<User | null> {
    return await this.db.user.findFirst({
      where: { id },
    });
  }

  //COMMENT update user by id
  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return await this.db.user.update({ where: { id }, data });
  }

  //COMMENT delete user by id
  async deleteUser(id: string): Promise<User> {
    return await this.db.user.delete({ where: { id } });
  }
}
