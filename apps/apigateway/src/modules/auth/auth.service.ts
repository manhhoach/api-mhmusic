import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_SERVICE_NAME, UserServiceClient } from '@app/common/proto/user';
import { MESSAGES } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';

const comparePassword = (password: string, hashedPassword: string): boolean => {
  return compareSync(password, hashedPassword);
};

@Injectable()
export class AuthService implements OnModuleInit {
  private usersService: UserServiceClient;

  constructor(
    @Inject(USER_SERVICE_NAME) private client: ClientGrpc,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  register(createUserDto) {
    return this.usersService.create(createUserDto);
  }

  async login(loginDto: LoginDto) {
    const user = await lastValueFrom(
      this.usersService.findByEmail({ email: loginDto.email }),
    );
    if (!comparePassword(loginDto.password, user.password))
      throw new UnauthorizedException(MESSAGES.INCORRECT_PASSWORD);

    const payload = { id: user.id };
    return {
      ...user,
      password: undefined,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log(payload);
      
      const user = await lastValueFrom(
        this.usersService.findById({ id: payload.id }),
      );

      if (user) return user;
      else throw new NotFoundException(MESSAGES.EMAIL_NOT_FOUND);
    } catch(err) {
      throw new UnauthorizedException();
    }
  }
}
