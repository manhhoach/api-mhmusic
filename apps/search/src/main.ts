import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search/search.module';

async function bootstrap() {
  const app = await NestFactory.create(SearchModule);
  await app.listen(3001);
}
bootstrap();
