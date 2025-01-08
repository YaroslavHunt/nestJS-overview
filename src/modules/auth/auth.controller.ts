import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { UserLoginDto } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiResponse({ status: 201, type: CreateUserDto }) // Created
  @HttpCode(201)
  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registerUser(dto);
  }

  @ApiResponse({ status: 200, type: AuthUserResponse }) // OK
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: UserLoginDto): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
}
