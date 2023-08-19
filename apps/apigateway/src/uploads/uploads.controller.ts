import { Controller, Post, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, Inject, Res, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
const MAX_MB_SIZE = 25;

@Controller('uploads')
export class UploadsController {
  constructor(@Inject("UPLOAD_SERVICE") private readonly client: ClientProxy) { }

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(@UploadedFile(
    new ParseFilePipeBuilder()
      .addMaxSizeValidator({ maxSize: MAX_MB_SIZE * 1000 * 1000 })
      .addFileTypeValidator({ fileType: /^audio\//i }) // mimetype
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, fileIsRequired: true })
  ) file: Express.Multer.File, @Res() res: Response) {
    try {
      let url = await lastValueFrom(this.client.send('upload-mp3', file))
      res.status(200).json({
        url
      })
    }
    catch (err) {
      throw new BadRequestException()
    }

  }

}
