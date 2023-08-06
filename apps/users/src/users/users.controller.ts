import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindByEmailDto, FindByIdDto } from '@app/common';
import { Payload, GrpcMethod, RpcException } from '@nestjs/microservices';
import {CreateUserDto} from '../../../apigateway/src/auth/dto/create.user.dto';
import {UpdateUserDto} from '../../../apigateway/src/auth/dto/update.user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @GrpcMethod('UserService', 'CreateUser')
  async create(@Payload() createUserDto: CreateUserDto) {
    try {
      console.log('user controller')
      
      let user = await this.usersService.create(createUserDto);
      return user
    }
    catch (err) {
      throw new RpcException(err)
    }
  }


  findAll() {
    return this.usersService.findAll();
  }

  @GrpcMethod('UserService', 'FindByEmail')
  async findByEmail(@Payload() findByEmailDto: FindByEmailDto) {
    // default, method return "Internal server error" if it have error
    try {
      let user = await this.usersService.findOne(findByEmailDto);
      return user;
    }
    catch (err) {
      throw new RpcException(err)
    }
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
