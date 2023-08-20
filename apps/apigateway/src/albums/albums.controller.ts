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
  NotFoundException,
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
    return tryCatchHttpException(this.albumsService.createAlbum(createAlbumDto), HttpStatus.CREATED)
  }

  @Get()
  async findAll(@Query() query) {
    const queryData = {
      pageIndex: query.pageIndex ? query.pageIndex : PAGE_INDEX,
      pageSize: query.pageSize ? query.pageSize : PAGE_SIZE,
      order: query.order ? query.order : ORDER,
    };
    const data = await lastValueFrom(this.albumsService.findAll(queryData));
    data.data = data.data ? data.data : [];

   return responseSucess(HttpStatus.OK, data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return tryCatchHttpException(this.albumsService.findById({ id }), HttpStatus.OK);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto) {
    return tryCatchHttpException(this.albumsService.updateAlbum({ id, ...updateAlbumDto }), HttpStatus.OK);

  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return tryCatchHttpException(this.albumsService.deleteAlbum({ id }), HttpStatus.OK);
  }
}
