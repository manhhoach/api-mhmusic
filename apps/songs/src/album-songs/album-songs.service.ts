import { AlbumSongEntity } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  ValidateCreateAlbumSongDto } from './dto/create-album-song.dto';


@Injectable()
export class AlbumSongsService {
  constructor( @InjectRepository(AlbumSongEntity)
  private readonly albumSongRepository: Repository<AlbumSongEntity>,){}
  create(createAlbumSongDto: ValidateCreateAlbumSongDto) {
    return this.albumSongRepository.save(Object.assign(new AlbumSongEntity(), createAlbumSongDto))
  }

  findAllByAlbum(query) {

    return this.albumSongRepository.createQueryBuilder("albumSong")
    .where("albumSong.album = :albumId", { albumId: query.albumId })
    .innerJoinAndSelect("albumSong.song", "song")
    .select(["song.id", "song.name", "song.url", "song.view", "albumSong"])
    .take(query.limit).skip(query.offset)
    .orderBy({ "albumSong.createdAt": "DESC" })
    .getManyAndCount();
  }

  remove(id: number) {
    return `This action removes a #${id} albumSong`;
  }
}
