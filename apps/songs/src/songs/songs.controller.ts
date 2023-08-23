import { Controller } from '@nestjs/common';
import { SongsService } from './songs.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { ValidateFindAllDto, ValidateFindByIdDto, tryCatchRpcException } from '@app/common';
import { ValidateCreateSongDto } from './dto/create-song.dto';
import { ValidateUpdateSongDto } from './dto/update-song.dto';

@Controller()
export class SongsController {
  constructor(private readonly songsService: SongsService) {}
  @GrpcMethod('SongService', 'create')
  async create(@Payload() createSongDto: ValidateCreateSongDto) {
    return tryCatchRpcException(this.songsService.create(createSongDto));
  }

  @GrpcMethod('SongService', 'findAll')
  findAll(@Payload() findAllDto: ValidateFindAllDto) {
    return tryCatchRpcException(this.songsService.findAll(findAllDto));
  }

  @GrpcMethod('SongService', 'findById')
  findById(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.songsService.findById(findByIdDto.id));
  }

  @GrpcMethod('SongService', 'update')
  update(@Payload() updateSongDto: ValidateUpdateSongDto) {
    return tryCatchRpcException(this.songsService.update(updateSongDto.id, updateSongDto),);
  }

  @GrpcMethod('SongService', 'delete')
  delete(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.songsService.delete(findByIdDto.id));
  }
}
