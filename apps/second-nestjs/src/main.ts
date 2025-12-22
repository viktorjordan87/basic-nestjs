import { NestFactory } from '@nestjs/core';
import { SecondNestjsModule } from './second-nestjs.module';

async function bootstrap() {
  const app = await NestFactory.create(SecondNestjsModule);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
