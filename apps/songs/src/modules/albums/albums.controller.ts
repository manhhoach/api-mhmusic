import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { AlbumsService } from './albums.service';
import { ValidateCreateAlbumDto } from './dto/create-album.dto';
import { ValidateUpdateAlbumDto } from './dto/update-album.dto';
import { ValidateFindDetailDto } from '@app/common';
import {
  ValidateFindAllDto,
  ValidateFindByIdDto,
  tryCatchRpcException,
} from '@app/common';
import { ValidateAddSongDto } from './dto/add-song.dto';
import { ValidateRemoveSongDto } from './dto/remove-song.dto';

@Controller()
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @GrpcMethod('AlbumService', 'create')
  async create(@Payload() createAlbumDto: ValidateCreateAlbumDto) {
    return tryCatchRpcException(this.albumsService.create(createAlbumDto));
  }

  @GrpcMethod('AlbumService', 'findAll')
  findAll(@Payload() findAllDto: ValidateFindAllDto) {
    return tryCatchRpcException(this.albumsService.findAll(findAllDto));
  }

  @GrpcMethod('AlbumService', 'update')
  update(@Payload() updateAlbumDto: ValidateUpdateAlbumDto) {
    return tryCatchRpcException(
      this.albumsService.update(updateAlbumDto.id, updateAlbumDto),
    );
  }

  @GrpcMethod('AlbumService', 'delete')
  delete(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.albumsService.delete(findByIdDto.id));
  }

  @GrpcMethod('AlbumService', 'addSongInAlbum')
  addSongInAlbum(@Payload() addSongDto: ValidateAddSongDto) {
    return tryCatchRpcException(this.albumsService.addSongInAlbum(addSongDto));
  }

  @GrpcMethod('AlbumService', 'findSongsInAlbum')
  findSongsInAlbum(@Payload() findDetailDto: ValidateFindDetailDto) {
    return tryCatchRpcException(
      this.albumsService.findSongsInAlbum(findDetailDto),
    );
  }
  @GrpcMethod('AlbumService', 'removeSongInAlbum')
  removeSongInAlbum(@Payload() removeSongDto: ValidateRemoveSongDto) {
    return tryCatchRpcException(
      this.albumsService.removeSongInAlbum(removeSongDto),
    );
  }
}
