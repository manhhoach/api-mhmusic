import { Module } from '@nestjs/common';
import { SingersModule } from './modules/singers/singers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { AlbumsModule } from './modules/albums/albums.module';
import { SongsModule } from './modules/songs/songs.module';
import { RedisModule } from './modules/redis/redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.songs.env' }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SingersModule,
    AlbumsModule,
    SongsModule,
    RedisModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
