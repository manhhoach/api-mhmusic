import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { SingersService } from './singers.service';
import { ValidateCreateSingerDto } from './dto/create-singer.dto';
import { ValidateUpdateSingerDto } from './dto/update-singer.dto';
import {
  ValidateFindAllDto,
  ValidateFindByIdDto,
  tryCatchRpcException,
} from '@app/common';

@Controller()
export class SingersController {
  constructor(private readonly singersService: SingersService) {}

  @GrpcMethod('SingerService', 'create')
  async create(@Payload() createSingerDto: ValidateCreateSingerDto) {
    return tryCatchRpcException(this.singersService.create(createSingerDto));
  }

  @GrpcMethod('SingerService', 'findAll')
  findAll(@Payload() findAllDto: ValidateFindAllDto) {
    return tryCatchRpcException(this.singersService.findAll(findAllDto));
  }

  @GrpcMethod('SingerService', 'findById')
  findById(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.singersService.findById(findByIdDto.id));
  }

  @GrpcMethod('SingerService', 'update')
  update(@Payload() updateSingerDto: ValidateUpdateSingerDto) {
    return tryCatchRpcException(
      this.singersService.update(updateSingerDto.id, updateSingerDto),
    );
  }

  @GrpcMethod('SingerService', 'delete')
  delete(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.singersService.delete(findByIdDto.id));
  }
}
