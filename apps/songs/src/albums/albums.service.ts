import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidateCreateAlbumDto } from './dto/create-album.dto';
import { ValidateUpdateAlbumDto } from './dto/update-album.dto';
import {
  AlbumEntity,
  MESSAGES,
  ValidateFindAllDto,
  ValidateFindDetailDto,
  getPagination,
  getPagingData,
} from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumSongsService } from '../album-songs/album-songs.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    private readonly albumSongsService: AlbumSongsService
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

  async findById(findDetailDto: ValidateFindDetailDto) {
    const { skip, limit } = getPagination(
      findDetailDto.pageSize,
      findDetailDto.pageIndex,
    );
    let data = await this.albumSongsService.findAllByAlbum({
      skip, limit, albumId: findDetailDto.id
    })
    
    if (!data) throw new NotFoundException(MESSAGES.NOT_FOUND);
    return data;
  }

  async update(id: string, updateAlbumDto: ValidateUpdateAlbumDto) {
    let data = await this.albumRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException(MESSAGES.NOT_FOUND);
    }
    data = Object.assign(data, updateAlbumDto);
    return this.albumRepository.save(data);
  }

  async delete(id: string) {
    const data = await this.albumRepository.findOne({
      where: { id: id },
    });
    if (!data) throw new NotFoundException(MESSAGES.NOT_FOUND);
    return this.albumRepository.delete(id);
  }
}
