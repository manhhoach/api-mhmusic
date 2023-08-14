import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidateCreateSingerDto } from './dto/create-singer.dto';
import { ValidateUpdateSingerDto } from './dto/update-singer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  SingerEntity,
  ValidateFindAllDto,
  getPagination,
  getPagingData,
} from '@app/common';

@Injectable()
export class SingersService {
  constructor(
    @InjectRepository(SingerEntity)
    private readonly singerRepository: Repository<SingerEntity>,
  ) {}
  create(createSingerDto: ValidateCreateSingerDto) {
    let data = new SingerEntity();
    data = Object.assign(data, createSingerDto);
    return this.singerRepository.save(data);
  }

  async findAll(findAllDto: ValidateFindAllDto) {
    const { skip, limit } = getPagination(
      findAllDto.pageSize,
      findAllDto.pageIndex,
    );
    const order: any = {};

    if (findAllDto.order) {
      const orderByField = findAllDto.order.split(' ')[0] || 'createdAt';
      const orderOrder = findAllDto.order.split(' ')[1] || 'DESC';
      order[orderByField] = orderOrder;
    }
    const data = await this.singerRepository.findAndCount({
      skip: skip,
      take: limit,
      order: order,
    });
    return getPagingData(data, findAllDto.pageIndex, limit);
  }

  async findById(id: string) {
    const data = await this.singerRepository.findOne({
      where: { id: id },
    });
    if (!data) throw new NotFoundException();
    return data;
  }

  async update(id: string, updateSingerDto: ValidateUpdateSingerDto) {
    let data = await this.singerRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException();
    }
    data = Object.assign(data, updateSingerDto);
    return this.singerRepository.save(data);
  }

  async delete(id: string) {
    const data = await this.singerRepository.findOne({
      where: { id: id },
    });
    if (!data) throw new NotFoundException();
    return this.singerRepository.delete(id);
  }
}
