import { Body, Controller, Get, Post } from '@nestjs/common';
import {UsersService} from "./users.service";
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Post('create-user')
    async createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    }
}
