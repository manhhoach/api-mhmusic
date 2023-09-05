import { AlbumEntity, SingerEntity, SongEntity } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
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
    private readonly elasticsearchService: ElasticsearchService,
  ) { }
  formatData(data: any[], name: string) {
    return data.flatMap(e => {
      return [
        { index: { _index: 'music', _id: e.id } }, { type: name, ...e }
      ]
    })
  }
  @Cron('*/15 * * * * *')
  async syncData() {
    let field: any = {
      select: ['name', 'id']
    }
    let [albums, songs, singers] = await Promise.all([
      this.albumRepository.find(field),
      this.songRepository.find(field),
      this.singerRepository.find(field)
    ])
    let albumsBody = this.formatData(albums, 'albums')
    let singersBody = this.formatData(singers, 'singers')
    let songsBody = this.formatData(songs, 'songs')
    await this.elasticsearchService.bulk({ body: songsBody.concat(albumsBody, singersBody) })
    console.log('synced');
  }

  async search(name: string) {
    const data = await this.elasticsearchService.search({
      index: 'music',
      body: {
        query: {
          match: { name: name }
        }
      }
    })
    console.log(data);

    return data.hits.hits.map(e => e._source)
  }
}
