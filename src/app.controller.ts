import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './user/dto/create-user.dto';
import { IUser } from './types';

@ApiTags('Auth')
@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'get all reviews', type: IUser })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({ status: 201, description: 'get all reviews', type: IUser })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
