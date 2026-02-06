import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import compression from '@fastify/compress';
import multipart from '@fastify/multipart';
import { MAX_FILE_SIZE_LIMIT, MAX_FILES_LIMIT } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  });
  //await app.register(compression);

  await app.register(multipart, {
    limits: {
      fileSize: MAX_FILE_SIZE_LIMIT, // 5 MB in bytes
      files: MAX_FILES_LIMIT,
    },
  });

  // await app.register(compression, { encodings: ['gzip', 'deflate'] });

  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
