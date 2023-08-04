import { Module } from '@nestjs/common';
import { ApigatewayController } from './apigateway.controller';
import { ApigatewayService } from './apigateway.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ApigatewayController],
  providers: [ApigatewayService],
})
export class ApigatewayModule {}
