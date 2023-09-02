import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindByEmailDto, FindByIdDto, USER_SERVICE_NAME } from '@app/common/proto/user';
import { Payload, GrpcMethod } from '@nestjs/microservices';
import { ValidateUpdateUserDto } from './dto/update-user.dto';
import { ValidateCreateUserDto } from './dto/create-user.dto';
import { ValidateChangePassUserDto } from './dto/change-pass.user';
import { tryCatchRpcException } from '@app/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @GrpcMethod(USER_SERVICE_NAME, 'Create')
  create(@Payload() createUserDto: ValidateCreateUserDto) {
    return tryCatchRpcException(this.usersService.create(createUserDto));
  }

  findAll() {
    return this.usersService.findAll();
  }

  @GrpcMethod(USER_SERVICE_NAME, 'FindByEmail')
  findByEmail(@Payload() findByEmailDto: FindByEmailDto) {
    return tryCatchRpcException(this.usersService.findOne(findByEmailDto));
  }

  @GrpcMethod(USER_SERVICE_NAME, 'FindById')
  findById(@Payload() findByIdDto: FindByIdDto) {
    return tryCatchRpcException(this.usersService.findOne(findByIdDto));
  }

  @GrpcMethod(USER_SERVICE_NAME, 'Update')
  update(@Payload() updateUserDto: ValidateUpdateUserDto) {
    return tryCatchRpcException(
      this.usersService.update(updateUserDto.id, updateUserDto),
    );
  }

  @GrpcMethod(USER_SERVICE_NAME, 'ChangePassword')
  changePassword(@Payload() changePassUserDto: ValidateChangePassUserDto) {
    return tryCatchRpcException(
      this.usersService.changePassword(changePassUserDto),
    );
  }

  @GrpcMethod(USER_SERVICE_NAME, 'UpgradeToAdmin')
  upgradeToAdmin(@Payload() findByIdDto: FindByIdDto) {
    return tryCatchRpcException(
      this.usersService.upgradeToAdmin(findByIdDto.id),
    );
  }

  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
