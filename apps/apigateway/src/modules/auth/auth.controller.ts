import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { tryCatchHttpException } from '@app/common';
import { SkipAuth } from './skip.auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return tryCatchHttpException(
      this.authService.login(loginDto),
      HttpStatus.OK,
    );
  }

  @SkipAuth()
  @Post('/register')
  async register(@Body() createUserDto) {
    return tryCatchHttpException(
      this.authService.register(createUserDto),
      HttpStatus.CREATED,
    );
  }
}
