import { NestFactory } from '@nestjs/core';
import { SongsModule } from './songs/songs.module';

async function bootstrap() {
  const app = await NestFactory.create(SongsModule);
  await app.listen(3000);
}
bootstrap();
