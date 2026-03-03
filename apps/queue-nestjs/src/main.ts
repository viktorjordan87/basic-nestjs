import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import multipart from '@fastify/multipart';
import { MAX_FILE_SIZE_LIMIT, MAX_FILES_LIMIT } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  console.log(
    `Application is running on: http://localhost:${process.env.PORT!}`,
  );

  await app.register(multipart, {
    limits: {
      fileSize: MAX_FILE_SIZE_LIMIT, // 5 MB in bytes
      files: MAX_FILES_LIMIT,
    },
  });

  await app.listen(process.env.PORT!);
}
bootstrap();
