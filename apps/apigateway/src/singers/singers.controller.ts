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
import { SingerServiceClient, SINGER_SERVICE_NAME } from '@app/common/proto/singer';
import { ClientGrpc } from '@nestjs/microservices';
import { PAGE_INDEX, PAGE_SIZE, ORDER, tryCatchHttpException, responseSucess } from '@app/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
@Controller('singers')
export class SingersController implements OnModuleInit {
  private singersService: SingerServiceClient;
  constructor(@Inject(SINGER_SERVICE_NAME) private client: ClientGrpc) { }

  onModuleInit() {
    this.singersService =
      this.client.getService<SingerServiceClient>(SINGER_SERVICE_NAME);
  }

  @Post()
  create(@Body() createSingerDto) {
    return tryCatchHttpException(this.singersService.createSinger(createSingerDto), HttpStatus.CREATED)
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
    return responseSucess(HttpStatus.OK, data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return tryCatchHttpException(this.singersService.findById({ id }), HttpStatus.OK)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSingerDto) {
    return tryCatchHttpException(this.singersService.updateSinger({ id, ...updateSingerDto }), HttpStatus.OK)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return tryCatchHttpException(this.singersService.deleteSinger({ id }), HttpStatus.OK)
  }
}
