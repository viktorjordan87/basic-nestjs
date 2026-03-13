import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    const user = this.usersService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...rest } = user;
    const payload = { sub: user.userId, username: user.username, roles: user.roles };
    const token = await this.jwtService.signAsync(payload, { expiresIn: '60s' });
    return {
      access_token: token,
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
