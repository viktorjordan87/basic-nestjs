import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as entities from '../entities';

// Load environment variables for CLI usage
config({ path: 'apps/typeorm-mysql/.env' });

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT!),
  username: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  entities: Object.values(entities),
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: false,
});

export default dataSource;
