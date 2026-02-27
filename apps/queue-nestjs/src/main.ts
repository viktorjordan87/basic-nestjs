import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  console.log(
    `Application is running on: http://localhost:${process.env.PORT!}`,
  );
  await app.listen(process.env.PORT!);
}
bootstrap();
