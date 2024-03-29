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
  UseGuards,
} from '@nestjs/common';
import {
  SingerServiceClient,
  SINGER_SERVICE_NAME,
} from '@app/common/proto/singer';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PAGE_INDEX,
  PAGE_SIZE,
  ORDER,
  tryCatchHttpException,
  responseSucess,
  Permissions,
} from '@app/common';
import { lastValueFrom } from 'rxjs';
import { PermissionGuard } from './../auth/permission.guard';
import { SkipAuth } from './../auth/skip.auth.decorator';

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
  @UseGuards(PermissionGuard(Permissions.CREATE))
  create(@Body() createSingerDto) {
    return tryCatchHttpException(
      this.singersService.create(createSingerDto),
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
    const data = await lastValueFrom(this.singersService.findAll(queryData));
    data.data = data.data ? data.data : [];
    return responseSucess(HttpStatus.OK, data);
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return tryCatchHttpException(
      this.singersService.findById({ id }),
      HttpStatus.OK,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSingerDto) {
    return tryCatchHttpException(
      this.singersService.update({ id, ...updateSingerDto }),
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return tryCatchHttpException(
      this.singersService.delete({ id }),
      HttpStatus.OK,
    );
  }
}
