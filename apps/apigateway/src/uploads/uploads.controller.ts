import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe, FileFormatValidationPipe } from './file.validation';
const MAX_MB_SIZE = 25;

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadSingle(@UploadedFile(
    new ParseFilePipeBuilder()
      .addMaxSizeValidator({ maxSize: MAX_MB_SIZE * 1000 * 1000 })
      .addFileTypeValidator({  fileType: /^audio\//i }) // mimetype
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, fileIsRequired: true })
  ) file: Express.Multer.File) {
    console.log(file);
  }

}
