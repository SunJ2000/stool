import {
  Controller,
  Post,
  Body,
  Inject,
  Res,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('register')
  async create(@Body(ValidationPipe) createUserDto: RegisterDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username,
        },
      });
      res.setHeader('token', `Bearer ${token}`);
      return 'login success';
    } else {
      return 'login fail';
    }
  }

  @Get('init')
  async initData() {
    await this.userService.initData();
    return 'done';
  }
}
