import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import { MESSAGE_PATTERN, MAX_MB_SIZE, UPLOAD_SERVICE_NAME } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: UPLOAD_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'uploads_queue',
          persistent: true,
          queueOptions: {
            durable: true
          }
        }
      }
    ]),
    MulterModule.register({
      
    })
  ],
  controllers: [UploadsController],
  providers: []
})
export class UploadsModule {}
