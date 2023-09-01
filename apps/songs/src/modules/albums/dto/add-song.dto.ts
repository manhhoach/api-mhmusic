import { IsUUID } from 'class-validator';

export class ValidateAddSongDto {
  @IsUUID()
  albumId: string;

  @IsUUID()
  songId: string;
}
