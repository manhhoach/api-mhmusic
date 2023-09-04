import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ConfigModule } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import esConfig from '../config/es.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './../../../songs/src/config/typeorm.config';
import { AlbumEntity, SingerEntity, SongEntity } from '@app/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.search.env',
      load: [esConfig],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([AlbumEntity, SingerEntity, SongEntity]),
    ElasticsearchModule.register(esConfig()),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
