import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AlbumSongsService } from './album-songs.service';
import { CreateAlbumSongDto } from './dto/create-album-song.dto';
import { UpdateAlbumSongDto } from './dto/update-album-song.dto';

@Controller()
export class AlbumSongsController {
  constructor(private readonly albumSongsService: AlbumSongsService) {}

  @MessagePattern('createAlbumSong')
  create(@Payload() createAlbumSongDto: CreateAlbumSongDto) {
    return this.albumSongsService.create(createAlbumSongDto);
  }

  @MessagePattern('findAllAlbumSongs')
  findAll() {
    return this.albumSongsService.findAll();
  }

  @MessagePattern('findOneAlbumSong')
  findOne(@Payload() id: number) {
    return this.albumSongsService.findOne(id);
  }

  @MessagePattern('updateAlbumSong')
  update(@Payload() updateAlbumSongDto: UpdateAlbumSongDto) {
    return this.albumSongsService.update(updateAlbumSongDto.id, updateAlbumSongDto);
  }

  @MessagePattern('removeAlbumSong')
  remove(@Payload() id: number) {
    return this.albumSongsService.remove(id);
  }
}
