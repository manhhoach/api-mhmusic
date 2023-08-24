import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ValidateCreateAlbumDto } from './dto/create-album.dto';
import { ValidateUpdateAlbumDto } from './dto/update-album.dto';
import {
  AlbumEntity,
  AlbumSongEntity,
  MESSAGES,
  ValidateFindAllDto,
  ValidateFindDetailDto,
  getPagination,
  getPagingData,
} from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidateAddSongDto } from './dto/add-song.dto';
import { ValidateRemoveSongDto } from './dto/remove-song.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity) private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(AlbumSongEntity) private readonly albumSongRepository: Repository<AlbumSongEntity>
  ) { }
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

  async findSongsInAlbum(findDetailDto: ValidateFindDetailDto) {
    const { skip, limit } = getPagination(
      findDetailDto.pageSize,
      findDetailDto.pageIndex,
    );
    let data: any = await this.albumSongRepository.createQueryBuilder("albumSong")
      .where("albumSong.album = :albumId", { albumId: findDetailDto.albumId })
      .innerJoinAndSelect("albumSong.song", "song")
      .select(["song.id", "song.name", "song.url", "song.views", "song.createdAt", "albumSong"])
      .take(limit).skip(skip)
      .orderBy({ "albumSong.createdAt": "DESC" })
      .getManyAndCount();
    data[0] = data[0].map(e=>{
      return {
        ...e.song,
        albumSongId: e.id
      }
    })
    let response = getPagingData(data, findDetailDto.pageIndex, limit)
    return response;
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

  async addSongInAlbum(addSongDto: ValidateAddSongDto) {
    try {
      let data = { album: addSongDto.albumId, song: addSongDto.songId }
      await this.albumSongRepository.save(Object.assign(new AlbumSongEntity(), data))
      return null;
    }
    catch (error) {
      throw new BadRequestException(MESSAGES.DUPLICATE_KEY)
    }
  }
  async removeSongInAlbum(removeSongDto: ValidateRemoveSongDto){
    const data = await this.albumSongRepository.findOne({
      where: { id: removeSongDto.albumSongId },
    });
    if (!data) throw new NotFoundException(MESSAGES.NOT_FOUND);
    return this.albumSongRepository.delete(removeSongDto.albumSongId );
  }
}
