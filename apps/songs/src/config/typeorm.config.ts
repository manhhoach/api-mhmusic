import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  SingerEntity,
  AlbumEntity,
  SongEntity,
  AlbumSongEntity,
} from '@app/common';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'mhmusic-songs',
  entities: [SingerEntity, AlbumEntity, SongEntity, AlbumSongEntity],
  synchronize: true,
};
