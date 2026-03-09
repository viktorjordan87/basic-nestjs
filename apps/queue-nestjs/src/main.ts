import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import multipart from '@fastify/multipart';
import { MAX_FILE_SIZE_LIMIT, MAX_FILES_LIMIT } from './utils/constants';
import secureSession from '@fastify/secure-session';
import path from 'path';

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

  await app.register(secureSession, {
    secret: process.env.SESSION_SECRET!,
    salt: process.env.SESSION_SALT!,
  })

  app.useStaticAssets({
    root: path.join(__dirname, '..', 'public'),
  })

  await app.listen(process.env.PORT!);
}
bootstrap();
