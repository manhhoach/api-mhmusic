import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { USER_SERVICE_NAME, UserServiceClient, UpdateUserDto, CreateUserDto, ChangePasswordDto, User, MESSAGES } from '@app/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import { UserEntity } from '@app/common';

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
    // c2
    // try {
    //   let user = await lastValueFrom(this.usersService.findByEmail({ email: createUserDto.email }))
    //   console.log(user);

    //   if (user)
    //     throw new BadRequestException('Email already registered')
    // }
    // catch (error) {
    //   if (error.details === MESSAGES.NOT_FOUND)
    //     return this.usersService.createUser(createUserDto)
    //   if (error instanceof BadRequestException)
    //     throw new BadRequestException('Email already registered')

    // }

    // c1
    let user = await lastValueFrom(this.usersService.findByEmail({ email: createUserDto.email }))
    console.log(user);

    if (user.name === 'NotFoundException') {
      return this.usersService.createUser(createUserDto)
    }
    else {
      throw new BadRequestException('Email already registered')
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
