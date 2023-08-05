import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserDto, UserEntity,
  UpdateUserDto, FindOneUserDto
} from '@app/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


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

  findOne(findOneUserDto: FindOneUserDto) {
    let query = this.usersRepository.createQueryBuilder('users')
      .where('email = :email', { email: findOneUserDto.email })
      .orWhere('id = :id', { id: findOneUserDto.id })
    if (findOneUserDto.email)
      query = query.addSelect('users.password')
    return query.getOne()
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
