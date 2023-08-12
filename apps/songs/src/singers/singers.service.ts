import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidateCreateSingerDto } from './dto/create-singer.dto';
import { ValidateUpdateSingerDto } from './dto/update-singer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SingerEntity } from '@app/common';
import { Repository } from 'typeorm';
import { ValidateFindAllDto } from './dto/find-all.dto';

@Injectable()
export class SingersService {
  constructor(@InjectRepository(SingerEntity) private readonly singerRepository: Repository<SingerEntity>) {

  }
  create(createSingerDto: ValidateCreateSingerDto) {
    let data = new SingerEntity()
    data = Object.assign(data, createSingerDto)
    return this.singerRepository.save(data)
  }

  findAll(findAllDto: ValidateFindAllDto) {
    return `This action returns all singers`;
  }

  findById(id: string) {
    return this.singerRepository.findOne({
      where: { id: id }
    })
  }

  async update(id: string, updateSingerDto: ValidateUpdateSingerDto) {
    let singer = await this.singerRepository.findOne({where: {id: id}})
    if(!singer){
      throw new NotFoundException()
    }
    singer = Object.assign(singer, updateSingerDto)
    return this.singerRepository.save(singer)
  }

  delete(id: string) {
    return this.singerRepository.delete(id);
  }
}
