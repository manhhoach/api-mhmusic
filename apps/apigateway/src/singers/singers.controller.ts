import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, Inject, OnModuleInit, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { SingerServiceClient } from '@app/common/proto/singer';
import { SINGER_SERVICE_NAME } from '@app/common/proto/singer'
import { ClientGrpc } from '@nestjs/microservices';
import { PAGE_INDEX, PAGE_SIZE, ORDER } from '@app/common';


@Injectable()
@Controller('singers')
export class SingersController implements OnModuleInit {
  private singersService: SingerServiceClient;
  constructor(@Inject(SINGER_SERVICE_NAME) private client: ClientGrpc) { }

  onModuleInit() {
    this.singersService = this.client.getService<SingerServiceClient>(SINGER_SERVICE_NAME);
  }

  @Post()
  create(@Body() createSingerDto) {
    return this.singersService.createSinger(createSingerDto);
  }

  @Get()
  async findAll(@Query() query) {
    let queryData = {
      pageIndex: query.pageIndex ? query.pageIndex : PAGE_INDEX,
      pageSize: query.pageSize ? query.pageSize : PAGE_SIZE,
      order: query.order ? query.order : ORDER
    }
    let data = await this.singersService.findAll(queryData).toPromise()
    data.data = data.data ? data.data : []
    
    return data
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      let singer = await this.singersService.findById({ id }).toPromise()
      return singer
    }
    catch (err) {
      throw new NotFoundException(err.details)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSingerDto) {
    try {
      let data = await this.singersService.updateSinger({ id, ...updateSingerDto }).toPromise();
      return data
    }
    catch (err) {
      throw new NotFoundException(err.details)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      let singer = await this.singersService.deleteSinger({ id }).toPromise()
      return singer
    }
    catch (err) {
      throw new NotFoundException(err.details)
    }

  }
}
