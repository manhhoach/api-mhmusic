import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MESSAGES, UserEntity } from '@app/common';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidateCreateUserDto } from './dto/create-user.dto';

const comparePassword = (password: string, hashedPassword: string): boolean => {
  return compareSync(password, hashedPassword);
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: ValidateCreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException(MESSAGES.EMAIL_EXISTS);
    }
    return this.usersRepository.save(
      Object.assign(new UserEntity(), createUserDto),
    );
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('email = :email', { email: loginDto.email })
      .addSelect('users.password')
      .getOne();

    if (!user) throw new NotFoundException(MESSAGES.EMAIL_NOT_FOUND);

    if (!comparePassword(loginDto.password, user.password))
      throw new UnauthorizedException(MESSAGES.INCORRECT_PASSWORD);

    const payload = { id: user.id };
    return {
      ...user,
      password: undefined,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async decodeToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.usersRepository.findOneBy({ id: payload.id });
      if (user) return user;
      throw new NotFoundException(MESSAGES.EMAIL_NOT_FOUND);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
