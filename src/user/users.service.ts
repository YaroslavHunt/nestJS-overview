import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    getUsers() {
        return null;
    }

    async createUser(dto):Promise<CreateUserDto> {
        dto.password = await this.hashPassword(dto.password);
        await this.userRepository.create(dto);
        return dto;
    }
}
