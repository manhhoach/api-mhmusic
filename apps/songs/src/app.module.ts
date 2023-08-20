import { Module } from '@nestjs/common';
import { SingersModule } from './singers/singers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AlbumsModule } from './albums/albums.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SingersModule,
    AlbumsModule,
    SongsModule
  ],
  providers: [],
  exports: [],
})
export class AppModule { }
