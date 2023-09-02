import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Inject,
  Res,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
import {
  MESSAGE_PATTERN,
  MAX_MB_SIZE,
  Permissions,
  responseSucess,
  UPLOAD_SERVICE_NAME
} from '@app/common';
import { PermissionGuard } from '../auth/permission.guard';

@Controller('uploads')
export class UploadsController {
  constructor(@Inject(UPLOAD_SERVICE_NAME) private readonly client: ClientProxy) { }

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(PermissionGuard(Permissions.CREATE))
  async uploadSingle(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: MAX_MB_SIZE * 1000 * 1000 })
        .addFileTypeValidator({ fileType: /^audio\//i }) // mimetype
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const url = await lastValueFrom(this.client.send(MESSAGE_PATTERN, file));
      res.status(200).json(responseSucess(HttpStatus.OK, url));
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
