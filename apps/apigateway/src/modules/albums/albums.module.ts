import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  ALBUM_SERVICE_NAME,
  ALBUM_PACKAGE_NAME,
} from '@app/common/proto/album';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ALBUM_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: ALBUM_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/album.proto'),
          url: process.env.PUBLIC_HOST_SONGS_SERVICE,
        },
      },
    ]),
  ],
  controllers: [AlbumsController],
  providers: [],
})
export class AlbumsModule {}
