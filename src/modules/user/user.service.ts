import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@modules/user/dto';
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
  findOneById(id: string) {
    return this.userRepository.getUserById(id);
  }
  findOneByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }
  remove(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
