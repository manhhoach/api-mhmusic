import { BadRequestException, Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  constructor(private readonly configService: ConfigService) {
    let s3Config = this.configService.get('s3')
    this.s3Client = new S3Client(s3Config);
  }
  async uploadToS3(file: Express.Multer.File): Promise<string> {
    const fileName = file.originalname;
    const bucketName = this.configService.get<string>('BUCKET_NAME');
    const params: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentLength: file.size,
    };
    const result = await this.s3Client.send(new PutObjectCommand(params));

    if (result.$metadata.httpStatusCode === 200) {
      return `https://${bucketName}.s3.${this.configService.get<string>('REGION')}.amazonaws.com/${fileName}`;
    }

    throw new BadRequestException();
  }
}
