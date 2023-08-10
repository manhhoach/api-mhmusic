import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller()
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @MessagePattern('createAlbum')
  create(@Payload() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @MessagePattern('findAllAlbums')
  findAll() {
    return this.albumsService.findAll();
  }

  @MessagePattern('findOneAlbum')
  findOne(@Payload() id: number) {
    return this.albumsService.findOne(id);
  }

  @MessagePattern('updateAlbum')
  update(@Payload() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(updateAlbumDto.id, updateAlbumDto);
  }

  @MessagePattern('removeAlbum')
  remove(@Payload() id: number) {
    return this.albumsService.remove(id);
  }
}
