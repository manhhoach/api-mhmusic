import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/common';
import { typeOrmConfig } from './../config/typeorm.config'
import { APP_PIPE } from '@nestjs/core';
import { GrpcValidationPipe } from './grpc.validation.pipe';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService,{
    provide: APP_PIPE,
    useClass: GrpcValidationPipe
  } ]
})
export class UsersModule { }
