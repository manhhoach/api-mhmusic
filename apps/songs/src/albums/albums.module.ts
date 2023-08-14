import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumEntity } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumsController],
  providers: [AlbumsService]
})
export class AlbumsModule {}
