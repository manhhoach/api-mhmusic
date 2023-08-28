import { Module } from '@nestjs/common';
import { SingersModule } from './singers/singers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AlbumsModule } from './albums/albums.module';
import { SongsModule } from './songs/songs.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SingersModule,
    AlbumsModule,
    SongsModule,
    RedisModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
