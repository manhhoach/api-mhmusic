import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidateCreateSongDto } from './dto/create-song.dto';
import { ValidateUpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  SongEntity,
  ValidateFindAllDto,
  getPagination,
  getPagingData,
} from '@app/common';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) { }
  create(createSongDto: ValidateCreateSongDto) {
    let data = new SongEntity();
    data = Object.assign(data, createSongDto);
    return this.songRepository.save(data);
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
    const data = await this.songRepository.findAndCount({
      skip: skip,
      take: limit,
      order: order,
    });
    return getPagingData(data, findAllDto.pageIndex, limit);
  }

  async findById(id: string) {
    const data = await this.songRepository.findOne({
      where: { id: id },
    });
    if (!data) throw new NotFoundException();
    return data;
  }

  async update(id: string, updateSongDto: ValidateUpdateSongDto) {
    let data = await this.songRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException();
    }
    data = Object.assign(data, updateSongDto);
    return this.songRepository.save(data);
  }

  async delete(id: string) {
    const data = await this.songRepository.findOne({
      where: { id: id },
    });
    if (!data) throw new NotFoundException();
    return this.songRepository.delete(id);
  }
}
