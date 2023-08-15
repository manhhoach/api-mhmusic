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
} from '@nestjs/common';
import { AlbumServiceClient, ALBUM_SERVICE_NAME } from '@app/common/proto/album';
import { ClientGrpc } from '@nestjs/microservices';
import { PAGE_INDEX, PAGE_SIZE, ORDER } from '@app/common';
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
    return this.albumsService.createAlbum(createAlbumDto);
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

    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.albumsService.findById({ id }));
    } catch (err) {
      throw new NotFoundException(err.details);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto) {
    try {
      return await lastValueFrom(this.albumsService.updateAlbum({ id, ...updateAlbumDto }))
    } catch (err) {
      throw new NotFoundException(err.details);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.albumsService.deleteAlbum({ id }));
    } catch (err) {
      throw new NotFoundException(err.details);
    }
  }
}
