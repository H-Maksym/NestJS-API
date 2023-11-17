import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  findAll() {
    return this.userRepository.getUsers();
  }

  findOne(id: string) {
    return this.userRepository.getUser(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
