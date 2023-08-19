import { NestFactory } from '@nestjs/core';
import { UploadsModule } from './uploads/uploads.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UploadsModule, {
    transport: Transport.RMQ,
    options:{
      urls: ['amqp://localhost:5672'],
      queue: 'uploads_queue',
      noAck: false, 
      persistent: true,
      queueOptions:{
        durable: true
      },
    }
  });
  await app.listen();
}
bootstrap();
