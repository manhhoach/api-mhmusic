import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidateCreateAlbumDto } from './dto/create-album.dto';
import { ValidateUpdateAlbumDto } from './dto/update-album.dto';
import {
  AlbumEntity,
  ValidateFindAllDto,
  getPagination,
  getPagingData,
} from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}
  create(createAlbumDto: ValidateCreateAlbumDto) {
    let data = new AlbumEntity();
    data = Object.assign(data, createAlbumDto);
    return this.albumRepository.save(data);
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
    const data = await this.albumRepository.findAndCount({
      skip: skip,
      take: limit,
      order: order,
    });
    return getPagingData(data, findAllDto.pageIndex, limit);
  }

  async findById(id: string) {
    const data = await this.albumRepository.findOne({
      where: { id: id },
    });
    if (!data) throw new NotFoundException();
    return data;
  }

  async update(id: string, updateAlbumDto: ValidateUpdateAlbumDto) {
    let data = await this.albumRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException();
    }
    data = Object.assign(data, updateAlbumDto);
    return this.albumRepository.save(data);
  }

  async delete(id: string) {
    const data = await this.albumRepository.findOne({
      where: { id: id },
    });
    if (!data) throw new NotFoundException();
    return this.albumRepository.delete(id);
  }
}
