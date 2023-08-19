import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext, RpcException } from '@nestjs/microservices';
import { S3Service } from './s3.service';

@Controller()
export class UploadsController {
  constructor(private readonly s3Service: S3Service) { }

  @MessagePattern('upload-mp3')
  async upload(@Payload() payload: Express.Multer.File, @Ctx() context: RmqContext) {
    try {
      let url = await this.s3Service.uploadToS3(payload)
      if (url) {
        const channel = context.getChannelRef()
        const originalMessage = context.getMessage()
        channel.ack(originalMessage)
        return url
      }
      
    }
    catch (err) {
      throw new RpcException(err)
    }
  }

}
