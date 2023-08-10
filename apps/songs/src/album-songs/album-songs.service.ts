import { Injectable } from '@nestjs/common';
import { CreateAlbumSongDto } from './dto/create-album-song.dto';
import { UpdateAlbumSongDto } from './dto/update-album-song.dto';

@Injectable()
export class AlbumSongsService {
  create(createAlbumSongDto: CreateAlbumSongDto) {
    return 'This action adds a new albumSong';
  }

  findAll() {
    return `This action returns all albumSongs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} albumSong`;
  }

  update(id: number, updateAlbumSongDto: UpdateAlbumSongDto) {
    return `This action updates a #${id} albumSong`;
  }

  remove(id: number) {
    return `This action removes a #${id} albumSong`;
  }
}
