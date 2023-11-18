import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from '@modules/user/dto';
import { User } from '@prisma/client';
import { PasswordService } from '../../password/password.service';

@Injectable()
export class UserRepository {
  constructor(
    private readonly db: PrismaService,
    private readonly passwordService: PasswordService
  ) {}

  //COMMENT createUser
  async createUser(data: CreateUserDto): Promise<User> {
    const hashedPassword = this.passwordService.getHashPassword(data.password);
    return this.db.user.create({ data: { ...data, password: hashedPassword } });
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
