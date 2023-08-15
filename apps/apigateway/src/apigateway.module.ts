import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SingersModule } from './singers/singers.module';
import { AlbumsModule } from './albums/albums.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [AuthModule, UsersModule, SingersModule, AlbumsModule, UploadsModule],
  controllers: [],
  providers: [],
})
export class ApigatewayModule {}
