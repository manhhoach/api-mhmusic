import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { AlbumsService } from './albums.service';
import { ValidateCreateAlbumDto } from './dto/create-album.dto';
import { ValidateUpdateAlbumDto } from './dto/update-album.dto';
import { ValidateAddSongDto } from './dto/add-song.dto';
import { ValidateRemoveSongDto } from './dto/remove-song.dto';
import {
  ValidateFindAllDto,
  ValidateFindByIdDto,
  tryCatchRpcException,
  ValidateFindDetailDto,
} from '@app/common';
import { ALBUM_SERVICE_NAME } from '@app/common/proto/album';

@Controller()
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @GrpcMethod(ALBUM_SERVICE_NAME, 'create')
  async create(@Payload() createAlbumDto: ValidateCreateAlbumDto) {
    return tryCatchRpcException(this.albumsService.create(createAlbumDto));
  }

  @GrpcMethod(ALBUM_SERVICE_NAME, 'findAll')
  findAll(@Payload() findAllDto: ValidateFindAllDto) {
    return tryCatchRpcException(this.albumsService.findAll(findAllDto));
  }

  @GrpcMethod(ALBUM_SERVICE_NAME, 'update')
  update(@Payload() updateAlbumDto: ValidateUpdateAlbumDto) {
    return tryCatchRpcException(
      this.albumsService.update(updateAlbumDto.id, updateAlbumDto),
    );
  }

  @GrpcMethod(ALBUM_SERVICE_NAME, 'delete')
  delete(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.albumsService.delete(findByIdDto.id));
  }

  @GrpcMethod(ALBUM_SERVICE_NAME, 'addSongInAlbum')
  addSongInAlbum(@Payload() addSongDto: ValidateAddSongDto) {
    return tryCatchRpcException(this.albumsService.addSongInAlbum(addSongDto));
  }

  @GrpcMethod(ALBUM_SERVICE_NAME, 'findSongsInAlbum')
  findSongsInAlbum(@Payload() findDetailDto: ValidateFindDetailDto) {
    return tryCatchRpcException(
      this.albumsService.findSongsInAlbum(findDetailDto),
    );
  }
  @GrpcMethod(ALBUM_SERVICE_NAME, 'removeSongInAlbum')
  removeSongInAlbum(@Payload() removeSongDto: ValidateRemoveSongDto) {
    return tryCatchRpcException(
      this.albumsService.removeSongInAlbum(removeSongDto),
    );
  }
}
