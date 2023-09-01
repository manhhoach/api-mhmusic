import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  SingerEntity, AlbumEntity, SongEntity, AlbumSongEntity
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';



export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_DATABASE || 'mhmusic-songs',
      entities: [SingerEntity, AlbumEntity, SongEntity, AlbumSongEntity],
      synchronize: true,
    }
  }
};
