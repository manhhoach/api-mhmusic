import { Controller } from '@nestjs/common';
import { AlbumSongsService } from './album-songs.service';



@Controller()
export class AlbumSongsController {
  constructor(private readonly albumSongsService: AlbumSongsService) {}

}
