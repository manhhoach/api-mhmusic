import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  ChangePasswordDto,
  UpdateUserDto,
  FindByEmailDto,
  FindByIdDto,
} from '@app/common/proto/user';
import { UserEntity, MESSAGES } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
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

  findAll() {
    return `This action returns all users`;
  }

  async findOne(findOneUserDto: FindByEmailDto | FindByIdDto) {
    let query = this.usersRepository.createQueryBuilder('users');
    if ('email' in findOneUserDto)
      query = query
        .where('email = :email', { email: findOneUserDto.email })
        .addSelect('users.password');
    else if ('id' in findOneUserDto)
      query = query.where('id = :id', { id: findOneUserDto.id });

    const user = await query.getOne();

    if (!user) {
      throw new NotFoundException(MESSAGES.EMAIL_NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) throw new NotFoundException(MESSAGES.EMAIL_NOT_FOUND);
    user = Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('id = :id', { id: changePasswordDto.id })
      .addSelect('users.password')
      .getOne();

    if (!user) {
      throw new NotFoundException(MESSAGES.EMAIL_NOT_FOUND);
    }
    const isCorrectPassword = user.comparePassword(
      changePasswordDto.currentPassword,
    );
    if (isCorrectPassword) {
      user.password = changePasswordDto.newPassword;
      return this.usersRepository.save(user);
    }
    throw new BadRequestException(MESSAGES.INCORRECT_PASSWORD);
  }
}
