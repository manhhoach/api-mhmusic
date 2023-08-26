import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, OnModuleInit, Query, Request, HttpStatus, UseGuards } from '@nestjs/common';
import { SongServiceClient, SONG_SERVICE_NAME } from '@app/common/proto/song';
import { ClientGrpc } from '@nestjs/microservices';
import { PAGE_INDEX, PAGE_SIZE, ORDER, responseSucess, tryCatchHttpException } from '@app/common';
import { lastValueFrom } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';

@Controller('songs')
export class SongsController implements OnModuleInit {
  private songsService: SongServiceClient
  constructor(@Inject(SONG_SERVICE_NAME) private client: ClientGrpc) { }

  onModuleInit() {
    this.songsService = this.client.getService<SongServiceClient>(SONG_SERVICE_NAME);
  }

  @Post()
  create(@Body() createSongDto) {
    return tryCatchHttpException(this.songsService.create(createSongDto), HttpStatus.CREATED)
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

    return responseSucess(HttpStatus.OK, data);
  }

  @Get('/chart')
  getChart() {
    return tryCatchHttpException(this.songsService.getChart({}), HttpStatus.OK)
  }

  @Get('/recent-songs')
  @UseGuards(AuthGuard)
  getRecentSongs(@Request() req) {
    return tryCatchHttpException(this.songsService.getRecentSongs({userId: req.user.id}), HttpStatus.OK)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return tryCatchHttpException(this.songsService.findById({ id }), HttpStatus.OK)
  }

  @Patch('/incre-views/:id')
  increViews(@Param('id') id: string) {
    return tryCatchHttpException(this.songsService.increViews({ id }), HttpStatus.OK)
  }

  @Get('/recent-songs')
  @UseGuards(AuthGuard)
  updateRecentSongs(@Body() body, @Request() req) {
    return tryCatchHttpException(this.songsService.updateRecentSongs({userId: req.user.id, songId: body.songId}), HttpStatus.OK)
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto) {
    return tryCatchHttpException(this.songsService.update({ id, ...updateSongDto }), HttpStatus.OK)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return tryCatchHttpException(this.songsService.delete({ id }), HttpStatus.OK)
  }

}
