import { Body, Controller, Delete, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @ApiTags('API')
  @ApiResponse({ status: 202, type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
    const user = request.user;
    return this.userService.updateUser(user.email, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    const user = request.user;
    return this.userService.deleteUser(user.email);
  }
}
