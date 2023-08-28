import { BadRequestException, Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { AWS_S3_CONFIG } from '../config/aws.s3.config';
import 'dotenv/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client(AWS_S3_CONFIG);
  }
  async uploadToS3(file: Express.Multer.File): Promise<string> {
    //let fileName = handleFileName(file.originalname)
    const fileName = file.originalname;

    const params: PutObjectCommandInput = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentLength: file.size,
    };
    const result = await this.s3Client.send(new PutObjectCommand(params));

    if (result.$metadata.httpStatusCode === 200) {
      return `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${fileName}`;
    }

    throw new BadRequestException();
  }
}
