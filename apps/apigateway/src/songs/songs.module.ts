import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SONG_PACKAGE_NAME, SONG_SERVICE_NAME } from '@app/common/proto/song';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SONG_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: SONG_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/song.proto'),
          url: 'localhost:5002',
        }
      }
    ]),
    AuthModule
  ],
  controllers: [SongsController],
  providers: []
})
export class SongsModule {}
