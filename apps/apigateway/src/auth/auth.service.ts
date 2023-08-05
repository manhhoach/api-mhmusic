import { BadGatewayException, Inject, Injectable, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { USER_SERVICE_NAME, UserServiceClient, UpdateUserDto, CreateUserDto, ChangePasswordDto } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
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

  async register(createUserDto: CreateUserDto) {
    try{
      let user = await this.usersService.findByEmail({ email: createUserDto.email }).toPromise()
      console.log(user);
      
      if (user) {
        throw new BadGatewayException('Email already registered')
      }
      return this.usersService.createUser(createUserDto)
    }
    catch(error){
      throw new Error(error)
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail({ email: loginDto.email }).toPromise()
    if (!user)
      throw new NotFoundException('Email not found')

    if (!comparePassword(loginDto.password, user.password))
      throw new UnauthorizedException('Password is incorrect')
    const payload = { id: user.id };
    return {
      ...user,
      password: undefined,
      accessToken: await this.jwtService.signAsync(payload)
    }
  }

}
