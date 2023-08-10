import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SingersService } from './singers.service';
import { CreateSingerDto } from './dto/create-singer.dto';
import { UpdateSingerDto } from './dto/update-singer.dto';

@Controller()
export class SingersController {
  constructor(private readonly singersService: SingersService) {}

  @MessagePattern('createSinger')
  create(@Payload() createSingerDto: CreateSingerDto) {
    return this.singersService.create(createSingerDto);
  }

  @MessagePattern('findAllSingers')
  findAll() {
    return this.singersService.findAll();
  }

  @MessagePattern('findOneSinger')
  findOne(@Payload() id: number) {
    return this.singersService.findOne(id);
  }

  @MessagePattern('updateSinger')
  update(@Payload() updateSingerDto: UpdateSingerDto) {
    return this.singersService.update(updateSingerDto.id, updateSingerDto);
  }

  @MessagePattern('removeSinger')
  remove(@Payload() id: number) {
    return this.singersService.remove(id);
  }
}
