import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Injectable,
  Inject,
  OnModuleInit,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { AlbumServiceClient, ALBUM_SERVICE_NAME } from '@app/common/proto/album';
import { ClientGrpc } from '@nestjs/microservices';
import { PAGE_INDEX, PAGE_SIZE, ORDER, tryCatchHttpException, responseSucess } from '@app/common';
import { lastValueFrom } from 'rxjs';


@Controller('albums')
@Injectable()
export class AlbumsController implements OnModuleInit {
  private albumsService: AlbumServiceClient;
  constructor(@Inject(ALBUM_SERVICE_NAME) private client: ClientGrpc) { }
  onModuleInit() {
    this.albumsService = this.client.getService<AlbumServiceClient>(ALBUM_SERVICE_NAME)
  }
  @Post()
  create(@Body() createAlbumDto) {
    return tryCatchHttpException(this.albumsService.create(createAlbumDto), HttpStatus.CREATED)
  }

  @Get()
  async findAll(@Query() query) {
    const queryData = {
      pageIndex: query.pageIndex ? parseInt(query.pageIndex) : PAGE_INDEX,
      pageSize: query.pageSize ? parseInt(query.pageSize) : PAGE_SIZE,
      order: query.order ? query.order : ORDER,
    };
    const data = await lastValueFrom(this.albumsService.findAll(queryData));
    data.data = data.data ? data.data : [];

    return responseSucess(HttpStatus.OK, data);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto) {
    return tryCatchHttpException(this.albumsService.update({ id, ...updateAlbumDto }), HttpStatus.OK);

  }


  @Delete('/remove-song/:id')
  async removeSongInAlbum(@Param('id') id: string) {
    return tryCatchHttpException(this.albumsService.removeSongInAlbum({albumSongId: id}), HttpStatus.OK);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return tryCatchHttpException(this.albumsService.delete({ id }), HttpStatus.OK);
  }

  @Post('/add-song')
  async addSongInAlbum(@Body() addSongDto) {
    return tryCatchHttpException(this.albumsService.addSongInAlbum(addSongDto), HttpStatus.CREATED);

  }

  @Get(':id')
  async findSongsInAlbum(@Param('id') id: string, @Query() query) {
    const payload = {
      albumId: id,
      pageIndex: query.pageIndex ? parseInt(query.pageIndex) : PAGE_INDEX,
      pageSize: query.pageSize ? parseInt(query.pageSize) : PAGE_SIZE
    };
    
    return tryCatchHttpException(this.albumsService.findSongsInAlbum(payload), HttpStatus.OK);
  }

}
