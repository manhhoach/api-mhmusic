import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SingersModule } from './singers/singers.module';
import { AlbumsModule } from './albums/albums.module';
import { UploadsModule } from './uploads/uploads.module';
import { SongsModule } from './songs/songs.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
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
export class ApigatewayModule {}
