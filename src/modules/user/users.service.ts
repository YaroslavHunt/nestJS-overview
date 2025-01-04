import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({where:{email}})
  }

  getUsers() {
    return null;
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create({
      username: dto.username,
      password: dto.password,
      email: dto.email,
    });
    return dto;
  }
}
