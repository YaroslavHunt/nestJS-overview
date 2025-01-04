import { IsString } from 'class-validator';

export class AuthUserResponse {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  token: string;
}