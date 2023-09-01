import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SingersModule } from './modules/singers/singers.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { SongsModule } from './modules/songs/songs.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.apigateway.env'}),
    AuthModule,
    UsersModule,
    SingersModule,
    AlbumsModule,
    UploadsModule,
    SongsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ApigatewayModule { }
