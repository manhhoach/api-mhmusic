import { IsUUID } from 'class-validator';

export class ValidateRemoveSongDto {
  @IsUUID()
  albumSongId: string;
}
