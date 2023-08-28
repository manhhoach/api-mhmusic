import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '@app/common';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'mhmusic-users',
  entities: [UserEntity],
  synchronize: true,
  logging: true,
};
