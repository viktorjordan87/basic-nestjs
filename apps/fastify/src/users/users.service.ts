import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ROLE } from '../auth/auth.roles';

@Injectable()
export class UsersService {

  private readonly users = [
    {
      userId: 1,
      username: 'John',
      password: 'Cena',
      roles: [ROLE.ADMIN],
    },
    {
      userId: 2,
      username: 'Santa',
      password: 'Maria',
      roles: [ROLE.USER],
    },
  ];

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
