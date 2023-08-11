import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SingersModule } from './singers/singers.module';

@Module({
  imports: [AuthModule, UsersModule, SingersModule],
  controllers: [],
  providers: [],
})
export class ApigatewayModule {}
