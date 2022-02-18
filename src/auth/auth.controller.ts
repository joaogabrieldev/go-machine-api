import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginInput) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() data: any) {
    return this.authService.createUser(data);
  }
}
