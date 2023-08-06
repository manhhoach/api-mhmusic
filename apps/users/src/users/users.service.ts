import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserDto, UserEntity,
  UpdateUserDto, FindByEmailDto, FindByIdDto, MESSAGES
} from '@app/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) { }

  create(createUserDto: CreateUserDto) {
    let user = new UserEntity()
    user = Object.assign(user, createUserDto)
    return this.usersRepository.save(user)
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(findOneUserDto: FindByEmailDto | FindByIdDto) {
    let query = this.usersRepository.createQueryBuilder('users')
    if ("email" in findOneUserDto)
      query = query.where('email = :email', { email: findOneUserDto.email }).addSelect('users.password')
    else if ("id" in findOneUserDto)
      query = query.where('id = :id', { id: findOneUserDto.id })

    let user = await query.getOne();

    // c1
    if (!user) {
      return new NotFoundException(MESSAGES.NOT_FOUND)
    }
    return user

    //c2
    // if (!user) {
    //   throw new NotFoundException(MESSAGES.NOT_FOUND)
    // }
    // return user


  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user = await this.usersRepository.findOne({
      where: { id: id }
    })
    if (!user)
      throw new NotFoundException()
    user = Object.assign(user, updateUserDto)
    return this.usersRepository.save(user)
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
