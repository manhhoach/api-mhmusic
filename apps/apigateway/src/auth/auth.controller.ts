import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { responseSucess } from '../../../../libs/common/src/helpers/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    let user = await this.authService.login(loginDto)
    return responseSucess(HttpStatus.OK, user)
  }

  @Post('/register')
  async register(@Body() createUserDto) {
    let user = await this.authService.register(createUserDto)
    return responseSucess(HttpStatus.OK, user)
  }

}
