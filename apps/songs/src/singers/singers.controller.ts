import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { SingersService } from './singers.service';
import { ValidateCreateSingerDto } from './dto/create-singer.dto';
import { ValidateUpdateSingerDto } from './dto/update-singer.dto';
import {
  ValidateFindAllDto,
  ValidateFindByIdDto,
  tryCatchGrpcException,
} from '@app/common';

@Controller()
export class SingersController {
  constructor(private readonly singersService: SingersService) {}

  @GrpcMethod('SingerService', 'createSinger')
  async create(@Payload() createSingerDto: ValidateCreateSingerDto) {
    return tryCatchGrpcException(this.singersService.create(createSingerDto));
  }

  @GrpcMethod('SingerService', 'findAll')
  findAll(@Payload() findAllDto: ValidateFindAllDto) {
    return tryCatchGrpcException(this.singersService.findAll(findAllDto));
  }

  @GrpcMethod('SingerService', 'findById')
  findById(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchGrpcException(this.singersService.findById(findByIdDto.id));
  }

  @GrpcMethod('SingerService', 'updateSinger')
  update(@Payload() updateSingerDto: ValidateUpdateSingerDto) {
    return tryCatchGrpcException(
      this.singersService.update(updateSingerDto.id, updateSingerDto),
    );
  }

  @GrpcMethod('SingerService', 'deleteSinger')
  delete(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchGrpcException(this.singersService.delete(findByIdDto.id));
  }
}
