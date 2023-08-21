import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumEntity } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumSongsModule } from '../album-songs/album-songs.module';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), AlbumSongsModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
