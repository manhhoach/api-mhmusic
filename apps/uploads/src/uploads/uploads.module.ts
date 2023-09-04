import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { UploadsController } from './uploads.controller';
import { ConfigModule } from '@nestjs/config';
import uploadConfig from '../config/upload.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [uploadConfig], envFilePath: '.uploads.env' }),
  ],
  controllers: [UploadsController],
  providers: [S3Service],
})
export class UploadsModule {}
