import { Module } from '@nestjs/common';
import { SingersService } from './singers.service';
import { SingersController } from './singers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerEntity } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([SingerEntity])],
  controllers: [SingersController],
  providers: [SingersService],
})
export class SingersModule {}
