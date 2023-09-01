import { IsString, IsNotEmpty } from 'class-validator';
import { ValidateCreateSongDto } from './create-song.dto';

export class ValidateUpdateSongDto extends ValidateCreateSongDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
