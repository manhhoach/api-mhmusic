import { NestFactory } from '@nestjs/core';
import { UploadsModule } from './uploads/uploads.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UploadsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: QUEUE_NAME,
        noAck: false,
        persistent: true,
        queueOptions: {
          durable: true
        }
      }
    }
  );
  await app.listen();
  console.log(`Upload service listen on ${process.env.RABBITMQ_URL}`);
  
}
bootstrap();
