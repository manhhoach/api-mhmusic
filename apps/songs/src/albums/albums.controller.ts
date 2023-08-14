import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { AlbumsService } from './albums.service';
import { ValidateCreateAlbumDto } from './dto/create-album.dto';
import { ValidateUpdateAlbumDto } from './dto/update-album.dto';
import { ValidateFindAllDto } from './dto/find-all.dto';
import { tryCatchGrpcException } from '@app/common/helpers/try.catch';
import { ValidateFindByIdDto } from './dto/find-by-id.dto';

@Controller()
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @GrpcMethod('AlbumService', 'createAlbum')
  async create(@Payload() createAlbumDto: ValidateCreateAlbumDto) {
    return tryCatchGrpcException(this.albumsService.create(createAlbumDto))
  }

  @GrpcMethod('AlbumService', 'findAll')
  findAll(@Payload() findAllDto: ValidateFindAllDto) {
    return tryCatchGrpcException(this.albumsService.findAll(findAllDto))
  }

  @GrpcMethod('AlbumService', 'findById')
  findById(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchGrpcException(this.albumsService.findById(findByIdDto.id))
  }

  @GrpcMethod('AlbumService', 'updateAlbum')
  update(@Payload() updateAlbumDto: ValidateUpdateAlbumDto) {
    return tryCatchGrpcException(this.albumsService.update(updateAlbumDto.id, updateAlbumDto))
  }

  @GrpcMethod('AlbumService', 'deleteAlbum')
  delete(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchGrpcException(this.albumsService.delete(findByIdDto.id))
  }
}
