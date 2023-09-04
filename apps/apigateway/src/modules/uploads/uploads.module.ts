import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import { UPLOAD_SERVICE_NAME, QUEUE_NAME } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.uploads.env' }),
    ClientsModule.register([
      {
        name: UPLOAD_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: QUEUE_NAME,
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    MulterModule.register({}),
  ],
  controllers: [UploadsController],
  providers: [],
})
export class UploadsModule {}
