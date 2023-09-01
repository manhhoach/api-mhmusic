import { IsString, IsNotEmpty } from 'class-validator';

export class ValidateCreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
