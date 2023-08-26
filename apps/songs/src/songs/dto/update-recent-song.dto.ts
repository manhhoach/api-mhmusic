import { IsUUID } from 'class-validator';

export class ValidateUpdateRecentSongsDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  songId: string;
}
