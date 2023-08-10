import { Module } from '@nestjs/common';
import { AlbumSongsService } from './album-songs.service';
import { AlbumSongsController } from './album-songs.controller';

@Module({
  controllers: [AlbumSongsController],
  providers: [AlbumSongsService]
})
export class AlbumSongsModule {}
