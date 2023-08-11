import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSingerDto } from './dto/create-singer.dto';
import { UpdateSingerDto } from './dto/update-singer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SingerEntity } from '@app/common';
import { Repository } from 'typeorm';

@Injectable()
export class SingersService {
  constructor(@InjectRepository(SingerEntity) private readonly singerRepository: Repository<SingerEntity>) {

  }
  create(createSingerDto: CreateSingerDto) {
    let data = new SingerEntity()
    data = Object.assign(data, createSingerDto)
    return this.singerRepository.save(data)
  }

  findAll() {
    return `This action returns all singers`;
  }

  findOne(id: string) {
    return this.singerRepository.findOne({
      where: { id: id }
    })
  }

  async update(id: string, updateSingerDto: UpdateSingerDto) {
    let singer = await this.singerRepository.findOne({where: {id: id}})
    if(singer){
      throw new NotFoundException()
    }
    singer = Object.assign(singer, updateSingerDto)
    return this.singerRepository.save(singer)
  }

  remove(id: string) {
    return this.singerRepository.delete(id);
  }
}
