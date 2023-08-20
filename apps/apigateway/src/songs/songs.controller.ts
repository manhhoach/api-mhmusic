import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, OnModuleInit, Query, NotFoundException } from '@nestjs/common';
import { SongServiceClient, SONG_SERVICE_NAME } from '@app/common/proto/song';
import { ClientGrpc } from '@nestjs/microservices';
import { PAGE_INDEX, PAGE_SIZE, ORDER } from '@app/common';
import { lastValueFrom } from 'rxjs';

@Controller('songs')
export class SongsController implements OnModuleInit {
  private songsService: SongServiceClient
  constructor(@Inject(SONG_SERVICE_NAME) private client: ClientGrpc) { }

  onModuleInit() {
    this.songsService = this.client.getService<SongServiceClient>(SONG_SERVICE_NAME);
  }

  @Post()
  create(@Body() createSongDto) {
    return this.songsService.createSong(createSongDto);
  }

  @Get()
  async findAll(@Query() query) {
    const queryData = {
      pageIndex: query.pageIndex ? query.pageIndex : PAGE_INDEX,
      pageSize: query.pageSize ? query.pageSize : PAGE_SIZE,
      order: query.order ? query.order : ORDER,
    };
    const data = await lastValueFrom(this.songsService.findAll(queryData));
    data.data = data.data ? data.data : [];

    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.songsService.findById({ id });
    } catch (err) {
      throw new NotFoundException(err.details);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSongDto) {
    try {
      return this.songsService.updateSong({ id, ...updateSongDto });
    } catch (err) {
      throw new NotFoundException(err.details);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.songsService.deleteSong({ id });
    } catch (err) {
      throw new NotFoundException(err.details);
    }
  }
}
