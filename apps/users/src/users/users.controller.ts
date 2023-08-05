import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, FindByEmailDto, FindByIdDto } from '@app/common';
import { } from '@app/common';
import { Payload, GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @GrpcMethod('UserService', 'CreateUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  findAll() {
    return this.usersService.findAll();
  }

  @GrpcMethod('UserService', 'FindByEmail')
  findByEmail(@Payload() findByEmailDto: FindByEmailDto) {
    console.log(findByEmailDto);
    
    return this.usersService.findOne(findByEmailDto);
  }

  @GrpcMethod('UserService', 'FindById')
  findById(@Payload() findByIdDto: FindByIdDto) {
    return this.usersService.findOne(findByIdDto);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }


  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
