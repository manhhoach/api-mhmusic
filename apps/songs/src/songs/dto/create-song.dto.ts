import { IsString, IsNotEmpty, IsUrl, IsUUID } from 'class-validator';

export class ValidateCreateSongDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsUUID()
  singer: string;
}
