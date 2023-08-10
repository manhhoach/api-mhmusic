import { BadRequestException, Inject, Injectable, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { USER_SERVICE_NAME, UserServiceClient } from '@app/common/types/user';
import { MESSAGES } from '@app/common'
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';



const comparePassword = (password: string, hashedPassword: string): boolean => {
  return compareSync(password, hashedPassword);
}

@Injectable()
export class AuthService implements OnModuleInit {
  private usersService: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc, private jwtService: JwtService) { }

  onModuleInit() {
    this.usersService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME)
  }

  async register(createUserDto) {
    try {
      let user = await lastValueFrom(this.usersService.createUser(createUserDto))
      return user;
    }
    catch (error) {
      if (error.details === MESSAGES.EMAIL_EXISTS)
        throw new BadRequestException(error.details)
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.usersService.findByEmail({ email: loginDto.email }).toPromise()

      if (!comparePassword(loginDto.password, user.password))
        throw new UnauthorizedException(MESSAGES.INCORRECT_PASSWORD)
      const payload = { id: user.id };
      return {
        ...user,
        password: undefined,
        accessToken: await this.jwtService.signAsync(payload)
      }
    }
    catch (error) {
      if (error instanceof UnauthorizedException)
        throw new UnauthorizedException(MESSAGES.INCORRECT_PASSWORD)
      throw new NotFoundException(error.details)
    }
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      let user = await lastValueFrom(this.usersService.findById({ id: payload.id }))
      if (user)
        return user;
      else
        throw new NotFoundException(MESSAGES.NOT_FOUND)
    } catch {
      throw new UnauthorizedException();
    }
  }
}
