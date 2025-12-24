import { NestFactory } from '@nestjs/core';
import { TypeormMysqlModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(TypeormMysqlModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
