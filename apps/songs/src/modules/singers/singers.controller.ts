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
import { SINGER_SERVICE_NAME } from '@app/common/proto/singer';

@Controller()
export class SingersController {
  constructor(private readonly singersService: SingersService) {}

  @GrpcMethod(SINGER_SERVICE_NAME, 'create')
  async create(@Payload() createSingerDto: ValidateCreateSingerDto) {
    return tryCatchRpcException(this.singersService.create(createSingerDto));
  }

  @GrpcMethod(SINGER_SERVICE_NAME, 'findAll')
  findAll(@Payload() findAllDto: ValidateFindAllDto) {
    return tryCatchRpcException(this.singersService.findAll(findAllDto));
  }

  @GrpcMethod(SINGER_SERVICE_NAME, 'findById')
  findById(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.singersService.findById(findByIdDto.id));
  }

  @GrpcMethod(SINGER_SERVICE_NAME, 'update')
  update(@Payload() updateSingerDto: ValidateUpdateSingerDto) {
    return tryCatchRpcException(
      this.singersService.update(updateSingerDto.id, updateSingerDto),
    );
  }

  @GrpcMethod(SINGER_SERVICE_NAME, 'delete')
  delete(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.singersService.delete(findByIdDto.id));
  }
}
