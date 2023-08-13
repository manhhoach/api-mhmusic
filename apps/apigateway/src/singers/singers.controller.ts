import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { SingerServiceClient } from '@app/common/proto/singer';
import { SINGER_SERVICE_NAME, SINGER_PACKAGE_NAME } from '@app/common/proto/singer'
import { ClientGrpc } from '@nestjs/microservices';


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
  findAll() {
    return this.singersService.findAll({} as any);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.singersService.findById({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSingerDto) {
    return this.singersService.updateSinger({ id, ...updateSingerDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.singersService.deleteSinger({ id });
  }
}
