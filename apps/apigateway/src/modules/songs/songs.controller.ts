import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  OnModuleInit,
  Query,
  Request,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { SongServiceClient, SONG_SERVICE_NAME } from '@app/common/proto/song';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PAGE_INDEX,
  PAGE_SIZE,
  ORDER,
  responseSucess,
  tryCatchHttpException,
  Permissions,
} from '@app/common';
import { lastValueFrom } from 'rxjs';
import { PermissionGuard } from '../auth/permission.guard';
import { SkipAuth } from '../auth/skip.auth.decorator';

@Controller('songs')
export class SongsController implements OnModuleInit {
  private songsService: SongServiceClient;
  constructor(@Inject(SONG_SERVICE_NAME) private client: ClientGrpc) { }

  onModuleInit() {
    this.songsService =
      this.client.getService<SongServiceClient>(SONG_SERVICE_NAME);
  }

  @Post()
  @UseGuards(PermissionGuard(Permissions.CREATE))
  create(@Body() createSongDto) {
    return tryCatchHttpException(
      this.songsService.create(createSongDto),
      HttpStatus.CREATED,
    );
  }

  @SkipAuth()
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

  @SkipAuth()
  @Get('/chart')
  getChart() {
    return tryCatchHttpException(this.songsService.getChart({}), HttpStatus.OK);
  }

  @Get('/recent-songs')
  async getRecentSongs(@Request() req) {
    const data = await lastValueFrom(
      this.songsService.getRecentSongs({ userId: req.user.id }),
    );
    return responseSucess(HttpStatus.OK, data.data);
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return tryCatchHttpException(
      this.songsService.findById({ id }),
      HttpStatus.OK,
    );
  }

  @SkipAuth()
  @Patch('/incre-views/:id')
  increViews(@Param('id') id: string) {
    return tryCatchHttpException(
      this.songsService.increViews({ id }),
      HttpStatus.OK,
    );
  }

  @Patch('/recent-songs')
  updateRecentSongs(@Body() body, @Request() req) {
    return tryCatchHttpException(
      this.songsService.updateRecentSongs({
        userId: req.user.id,
        songId: body.songId,
      }),
      HttpStatus.OK,
    );
  }

  @Patch(':id')
  @UseGuards(PermissionGuard(Permissions.UPDATE))
  update(@Param('id') id: string, @Body() updateSongDto) {
    return tryCatchHttpException(
      this.songsService.update({ id, ...updateSongDto }),
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(Permissions.DELETE))
  remove(@Param('id') id: string) {
    return tryCatchHttpException(
      this.songsService.delete({ id }),
      HttpStatus.OK,
    );
  }
}
