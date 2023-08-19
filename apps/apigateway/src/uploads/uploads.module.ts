import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UPLOAD_SERVICE',
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
