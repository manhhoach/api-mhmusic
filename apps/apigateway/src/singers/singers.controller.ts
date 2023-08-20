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
import { SingerServiceClient, SINGER_SERVICE_NAME } from '@app/common/proto/singer';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { PAGE_INDEX, PAGE_SIZE, ORDER } from '@app/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
@Controller('singers')
export class SingersController implements OnModuleInit {
  private singersService: SingerServiceClient;
  constructor(@Inject(SINGER_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.singersService =
      this.client.getService<SingerServiceClient>(SINGER_SERVICE_NAME);
  }

  @Post()
  create(@Body() createSingerDto) {
    return this.singersService.createSinger(createSingerDto);
  }

  @Get()
  async findAll(@Query() query) {
    const queryData = {
      pageIndex: query.pageIndex ? query.pageIndex : PAGE_INDEX,
      pageSize: query.pageSize ? query.pageSize : PAGE_SIZE,
      order: query.order ? query.order : ORDER,
    };
    const data = await lastValueFrom(this.singersService.findAll(queryData));
    data.data = data.data ? data.data : [];

    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const singer = await lastValueFrom(this.singersService.findById({ id }));
      return singer;
    } catch (err) {
      throw new RpcException(err.details);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSingerDto) {
    try {
      const data = await lastValueFrom(this.singersService.updateSinger({ id, ...updateSingerDto }))
      return data;
    } catch (err) {
      throw new NotFoundException(err.details);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const singer = await lastValueFrom(this.singersService.deleteSinger({ id }));
      return singer;
    } catch (err) {
      throw new NotFoundException(err.details);
    }
  }
}
