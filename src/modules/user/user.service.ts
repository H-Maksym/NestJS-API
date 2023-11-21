import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@modules/user/dto';
import { UserRepository } from './repository/user.repository';
import { IJwtPayload } from '@modules/auth/interfaces';
import { E_UserRole } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.createUser(createUserDto);
    console.log('🚀 ~ UserService ~ create ~ user:', user);

    return user;
  }
  findAll() {
    return this.userRepository.getUsers();
  }
  findOneById(id: string) {
    return this.userRepository.getUserById(id);
  }
  findOneByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }
  remove(id: string, user: IJwtPayload) {
    //COMMENT delete only own user and with status user role ADMIN
    const isAdmin = user.roles ? user.roles.includes(E_UserRole.ADMIN) : false;
    if (id !== user.id && !isAdmin) {
      throw new ForbiddenException();
    }
    return this.userRepository.deleteUser(id);
  }
}
