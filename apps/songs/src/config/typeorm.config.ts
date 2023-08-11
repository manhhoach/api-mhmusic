import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SingerEntity } from '@app/common';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'mhmusic-songs',
  entities: [SingerEntity],
  synchronize: true,
};
