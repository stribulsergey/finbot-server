import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_LOGGING,
  TYPEORM_MIGRATIONS,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
} from './config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: TYPEORM_HOST,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  port: +TYPEORM_PORT,
  logging: TYPEORM_LOGGING,
  entities: ['src/modules/**/*.dto.ts'],
  migrations: TYPEORM_MIGRATIONS.split(','),
  synchronize: false,
  migrationsRun: false,
  subscribers: [],
});

export default AppDataSource;
