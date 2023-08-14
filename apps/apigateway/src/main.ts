import { NestFactory } from '@nestjs/core';
import { ApigatewayModule } from './apigateway.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApigatewayModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
