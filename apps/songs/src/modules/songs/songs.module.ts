import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from '@app/common';
import { RedisModule } from './../redis/redis.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([SongEntity]),
    RedisModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
