import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from '@app/common/types/user';
import { join } from 'path';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/user.proto'),
          url: 'localhost:5001'
        }
      }
    ]),
  ],
  controllers: [UsersController]
})
export class UsersModule { }
