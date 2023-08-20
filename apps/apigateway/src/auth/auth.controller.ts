import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { responseSucess, tryCatchHttpException } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return tryCatchHttpException(this.authService.login(loginDto), HttpStatus.OK)
  }

  @Post('/register')
  async register(@Body() createUserDto) {
    return tryCatchHttpException(this.authService.register(createUserDto), HttpStatus.CREATED)
  }
}
