import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GrpcValidationPipe } from '@app/common';
import { SINGER_PACKAGE_NAME } from '@app/common/proto/singer';
import { ALBUM_PACKAGE_NAME } from '@app/common/proto/album';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: [
          join(__dirname, '../../../proto/singer.proto'),
          join(__dirname, '../../../proto/album.proto'),
        ],
        package: [SINGER_PACKAGE_NAME, ALBUM_PACKAGE_NAME],
        url: 'localhost:5002',
      },
    },
  );
  app.useGlobalPipes(new GrpcValidationPipe());
  await app.listen();
}
bootstrap();
