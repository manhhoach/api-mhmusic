import { Module } from '@nestjs/common';
import { SingersController } from './singers.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  SINGER_SERVICE_NAME,
  SINGER_PACKAGE_NAME,
} from '@app/common/proto/singer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SINGER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: SINGER_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/singer.proto'),
          url: 'localhost:5002',
        },
      },
    ]),
  ],
  controllers: [SingersController],
  providers: [],
})
export class SingersModule {}
