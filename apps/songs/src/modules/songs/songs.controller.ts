import { Controller } from '@nestjs/common';
import { SongsService } from './songs.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import {
  ValidateFindAllDto,
  ValidateFindByIdDto,
  tryCatchRpcException,
} from '@app/common';
import { ValidateCreateSongDto } from './dto/create-song.dto';
import { ValidateUpdateSongDto } from './dto/update-song.dto';
import { ValidateUpdateRecentSongsDto } from './dto/update-recent-song.dto';
import { ValidateGetRecentSongsDto } from './dto/get-recent-songs.dto';
import { SONG_SERVICE_NAME } from '@app/common/proto/song';

@Controller()
export class SongsController {
  constructor(private readonly songsService: SongsService) {}
  @GrpcMethod(SONG_SERVICE_NAME, 'create')
  async create(@Payload() createSongDto: ValidateCreateSongDto) {
    return tryCatchRpcException(this.songsService.create(createSongDto));
  }

  @GrpcMethod(SONG_SERVICE_NAME, 'findAll')
  findAll(@Payload() findAllDto: ValidateFindAllDto) {
    return tryCatchRpcException(this.songsService.findAll(findAllDto));
  }

  @GrpcMethod(SONG_SERVICE_NAME, 'findById')
  findById(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.songsService.findById(findByIdDto.id));
  }

  @GrpcMethod(SONG_SERVICE_NAME, 'update')
  update(@Payload() updateSongDto: ValidateUpdateSongDto) {
    return tryCatchRpcException(
      this.songsService.update(updateSongDto.id, updateSongDto),
    );
  }

  @GrpcMethod(SONG_SERVICE_NAME, 'delete')
  delete(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.songsService.delete(findByIdDto.id));
  }

  @GrpcMethod(SONG_SERVICE_NAME, 'increViews')
  increViews(@Payload() findByIdDto: ValidateFindByIdDto) {
    return tryCatchRpcException(this.songsService.increViews(findByIdDto.id));
  }

  @GrpcMethod(SONG_SERVICE_NAME, 'getChart')
  getChart(@Payload() empty: any) {
    return tryCatchRpcException(this.songsService.getChart());
  }

  @GrpcMethod(SONG_SERVICE_NAME, 'updateRecentSongs')
  updateRecentSongs(
    @Payload() updateRecentSongsDto: ValidateUpdateRecentSongsDto,
  ) {
    return tryCatchRpcException(
      this.songsService.updateRecentSongs(updateRecentSongsDto),
    );
  }

  @GrpcMethod(SONG_SERVICE_NAME, 'getRecentSongs')
  getRecentSongs(@Payload() getRecentSongsDto: ValidateGetRecentSongsDto) {
    return tryCatchRpcException(
      this.songsService.getRecentSongs(getRecentSongsDto),
    );
  }
}
