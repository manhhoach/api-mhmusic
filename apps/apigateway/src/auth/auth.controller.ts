import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { responseSucess } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return responseSucess(HttpStatus.OK, user);
  }

  @Post('/register')
  async register(@Body() createUserDto) {
    const user = await this.authService.register(createUserDto);
    return responseSucess(HttpStatus.OK, user);
  }
}
