import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { AlbumsService } from './albums.service';
import { ValidateCreateAlbumDto } from './dto/create-album.dto';
import { ValidateUpdateAlbumDto } from './dto/update-album.dto';
import {
  ValidateFindAllDto,
  ValidateFindByIdDto,
  tryCatchRpcException,
} from '@app/common';

@Controller()
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @GrpcMethod('AlbumService', 'createAlbum')
  async create(@Payload() createAlbumDto: ValidateCreateAlbumDto) {
    return tryCatchRpcException(this.albumsService.create(createAlbumDto));
  }

  @GrpcMethod('AlbumService', 'findAll')
  findAll(@Payload() findAllDto: ValidateFindAllDto) {
    return tryCatchRpcException(this.albumsService.findAll(findAllDto));
  }

  @GrpcMethod('AlbumService', 'findById')
  findById(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.albumsService.findById(findByIdDto.id));
  }

  @GrpcMethod('AlbumService', 'updateAlbum')
  update(@Payload() updateAlbumDto: ValidateUpdateAlbumDto) {
    return tryCatchRpcException(
      this.albumsService.update(updateAlbumDto.id, updateAlbumDto),
    );
  }

  @GrpcMethod('AlbumService', 'deleteAlbum')
  delete(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.albumsService.delete(findByIdDto.id));
  }
}
