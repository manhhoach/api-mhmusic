import { AlbumEntity, SingerEntity, SongEntity } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
    @InjectRepository(SingerEntity)
    private readonly singerRepository: Repository<SingerEntity>,
  ) {}
  @Cron('*/15 * * * * *')
  syncData() {
    console.log('hi');
    
  }

  async search() {}
}
