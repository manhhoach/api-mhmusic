import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GrpcValidationPipe } from '@app/common';
import { SINGER_PACKAGE_NAME } from '@app/common/proto/singer';
import { ALBUM_PACKAGE_NAME } from '@app/common/proto/album';
import { SONG_PACKAGE_NAME } from '@app/common/proto/song';
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
          join(__dirname, '../../../proto/song.proto'),
        ],
        package: [SINGER_PACKAGE_NAME, ALBUM_PACKAGE_NAME, SONG_PACKAGE_NAME],
        url: process.env.PUBLIC_HOST_SONGS_SERVICE,
      },
    },
  );
  app.useGlobalPipes(new GrpcValidationPipe());
  await app.listen();
  console.log(`Song service listen on ${process.env.PUBLIC_HOST_SONGS_SERVICE}`)
}
bootstrap();
