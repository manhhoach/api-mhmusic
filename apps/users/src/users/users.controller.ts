import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindByEmailDto, FindByIdDto } from '@app/common/proto/user';
import { Payload, GrpcMethod } from '@nestjs/microservices';
import { ValidateUpdateUserDto } from './dto/update-user.dto';
import { ValidateCreateUserDto } from './dto/create-user.dto';
import { ValidateChangePassUserDto } from './dto/change-pass.user';
import { tryCatchRpcException } from '@app/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'CreateUser')
  create(@Payload() createUserDto: ValidateCreateUserDto) {
    return tryCatchRpcException(this.usersService.create(createUserDto));
  }

  findAll() {
    return this.usersService.findAll();
  }

  @GrpcMethod('UserService', 'FindByEmail')
  findByEmail(@Payload() findByEmailDto: FindByEmailDto) {
    return tryCatchRpcException(this.usersService.findOne(findByEmailDto));
  }

  @GrpcMethod('UserService', 'FindById')
  findById(@Payload() findByIdDto: FindByIdDto) {
    return tryCatchRpcException(this.usersService.findOne(findByIdDto));
  }

  @GrpcMethod('UserService', 'UpdateUser')
  update(@Payload() updateUserDto: ValidateUpdateUserDto) {
    return tryCatchRpcException(
      this.usersService.update(updateUserDto.id, updateUserDto),
    );
  }

  @GrpcMethod('UserService', 'ChangePassword')
  changePassword(@Payload() changePassUserDto: ValidateChangePassUserDto) {
    return tryCatchRpcException(
      this.usersService.changePassword(changePassUserDto),
    );
  }

  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
