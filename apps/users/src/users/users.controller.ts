import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, FindByEmailDto, FindByIdDto } from '@app/common';
import { } from '@app/common';
import { Payload, GrpcMethod, RpcException } from '@nestjs/microservices';

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
  async findByEmail(@Payload() findByEmailDto: FindByEmailDto) {
    // default, method return "Internal server error" if it have error
    try{
      let user = await this.usersService.findOne(findByEmailDto);
      return user;
    }
    catch(err) {
      console.log(err);
      
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
