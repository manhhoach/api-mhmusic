import { ValidateCreateAlbumDto } from './create-album.dto';
import { IsUUID } from 'class-validator';

export class ValidateUpdateAlbumDto extends ValidateCreateAlbumDto {
  @IsUUID()
  id: string;
}
