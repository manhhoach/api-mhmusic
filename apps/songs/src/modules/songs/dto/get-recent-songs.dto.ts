import { IsUUID } from 'class-validator';

export class ValidateGetRecentSongsDto {
  @IsUUID()
  userId: string;
}
