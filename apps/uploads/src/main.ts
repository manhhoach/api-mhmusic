import { NestFactory } from '@nestjs/core';
import { UploadsModule } from './uploads/uploads.module';

async function bootstrap() {
  const app = await NestFactory.create(UploadsModule);
  await app.listen(3000);
}
bootstrap();
