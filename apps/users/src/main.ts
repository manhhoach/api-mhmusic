import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {USER_PACKAGE_NAME} from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../../../proto/user.proto'),
        package: USER_PACKAGE_NAME,
        url: 'localhost:5001'
      }
    }
  )
  await app.listen()
}
bootstrap();
