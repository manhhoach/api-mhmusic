import { Module } from '@nestjs/common';
import { AlbumSongsService } from './album-songs.service';
import { AlbumSongsController } from './album-songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumSongEntity } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumSongEntity])],
  controllers: [AlbumSongsController],
  providers: [AlbumSongsService],
  exports: [AlbumSongsService],
})
export class AlbumSongsModule {}
