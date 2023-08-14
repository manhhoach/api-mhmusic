import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindByEmailDto, FindByIdDto } from '@app/common/proto/user';
import { Payload, GrpcMethod } from '@nestjs/microservices';
import { ValidateUpdateUserDto } from './dto/update-user.dto';
import { ValidateCreateUserDto } from './dto/create-user.dto';
import { ValidateChangePassUserDto } from './dto/change-pass.user';
import { tryCatchGrpcException } from '@app/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async create(@Payload() createUserDto: ValidateCreateUserDto) {
    return tryCatchGrpcException(this.usersService.create(createUserDto));
  }

  findAll() {
    return this.usersService.findAll();
  }

  @GrpcMethod('UserService', 'FindByEmail')
  async findByEmail(@Payload() findByEmailDto: FindByEmailDto) {
    return tryCatchGrpcException(this.usersService.findOne(findByEmailDto));
  }

  @GrpcMethod('UserService', 'FindById')
  findById(@Payload() findByIdDto: FindByIdDto) {
    return tryCatchGrpcException(this.usersService.findOne(findByIdDto));
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async update(@Payload() updateUserDto: ValidateUpdateUserDto) {
    return tryCatchGrpcException(
      this.usersService.update(updateUserDto.id, updateUserDto),
    );
  }

  @GrpcMethod('UserService', 'ChangePassword')
  async changePassword(
    @Payload() changePassUserDto: ValidateChangePassUserDto,
  ) {
    return tryCatchGrpcException(
      this.usersService.changePassword(changePassUserDto),
    );
  }

  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
