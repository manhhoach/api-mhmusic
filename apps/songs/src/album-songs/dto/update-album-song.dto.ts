import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumSongDto } from './create-album-song.dto';

export class UpdateAlbumSongDto extends PartialType(CreateAlbumSongDto) {
  id: number;
}
