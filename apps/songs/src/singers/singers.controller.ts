import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { SingersService } from './singers.service';
import { ValidateCreateSingerDto } from './dto/create-singer.dto';
import { ValidateUpdateSingerDto } from './dto/update-singer.dto';
import { ValidateFindAllDto } from './dto/find-all.dto';
import { ValidateFindByIdDto } from './dto/find-by-id.dto';

@Controller()
export class SingersController {
  constructor(private readonly singersService: SingersService) { }

  @GrpcMethod('SingerService', 'createSinger')
  async create(@Payload() createSingerDto: ValidateCreateSingerDto) {
    let singer = await this.singersService.create(createSingerDto);
    return singer
  }

  @GrpcMethod('SingerService', 'findAll')
  findAll(@Payload() findAllDto: ValidateFindAllDto) {
    return this.singersService.findAll(findAllDto);
  }

  @GrpcMethod('SingerService', 'findById')
  findById(@Payload() findByIdDto: ValidateFindByIdDto) {
    return this.singersService.findById(findByIdDto.id);
  }

  @GrpcMethod('SingerService', 'updateSinger')
  update(@Payload() updateSingerDto: ValidateUpdateSingerDto) {
    return this.singersService.update(updateSingerDto.id, updateSingerDto);
  }

  @GrpcMethod('SingerService', 'deleteSinger')
  delete(@Payload() findByIdDto: ValidateFindByIdDto) {
    return this.singersService.delete(findByIdDto.id);
  }
}
