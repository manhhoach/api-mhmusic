import { Controller, Get } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller()
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  getHello(): string {
    return this.songsService.getHello();
  }
}
