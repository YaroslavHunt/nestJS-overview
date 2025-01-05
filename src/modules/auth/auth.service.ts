import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { CreateUserDto } from '../user/dto';
import { AppError } from '../../common/constants/errors';
import { UserLoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService
  ) {}

  async registerUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.usersService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    return this.usersService.createUser(dto);
  }

  async loginUser(dto: UserLoginDto): Promise<AuthUserResponse> {
    const existUser = await this.usersService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_DOES_NOT_EXIST);

    const validPassword = await bcrypt.compare(dto.password, existUser.password);
    if (!validPassword) throw new BadRequestException(AppError.WRONG_PASSWORD);

    const token = await this.tokenService.generateJwtToken(dto.email);
    const user = await this.usersService.publicUser(dto.email);

    return {...user, token};
  }
}