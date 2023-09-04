import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/common';
import { typeOrmConfig } from '../../config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.users.env' }),
    JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
