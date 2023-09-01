import { IsUUID } from 'class-validator';

export class ValidateCreateAlbumSongDto {
  @IsUUID()
  album: string;

  @IsUUID()
  song: string;
}
