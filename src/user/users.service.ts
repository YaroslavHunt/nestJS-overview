import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';
import { AppError } from '../common/errors';

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
    const existUser = await this.findUserByEmail(dto.email);
    if(existUser) throw new BadRequestException(AppError.USER_EXIST);

    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create({
      username: dto.username,
      password: dto.password,
      email: dto.email,
    });
    return dto;
  }
}
