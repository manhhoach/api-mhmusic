import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindByEmailDto, FindByIdDto } from '@app/common';
import { Payload, GrpcMethod, RpcException } from '@nestjs/microservices';
import { ValidateUpdateUserDto } from './dto/update.user';
import { ValidateCreateUserDto } from './dto/create.user';
import { ValidateChangePassUserDto } from './dto/change-pass.user';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @GrpcMethod('UserService', 'CreateUser')
  async create(@Payload() createUserDto: ValidateCreateUserDto) {
    try {
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
  async update(@Payload() updateUserDto: ValidateUpdateUserDto) {
    try {
      let user = await this.usersService.update(updateUserDto.id, updateUserDto);
      return user
    }
    catch (err) {
      throw new RpcException(err)
    }
  }

  @GrpcMethod('UserService', 'ChangePassword')
  async changePassword(@Payload() changePassUserDto: ValidateChangePassUserDto) {
    try {
      let result = await this.usersService.changePassword(changePassUserDto);
      if (result) {
        return;
      }
    }
    catch (err) {
      throw new RpcException(err)
    }
  }

  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
