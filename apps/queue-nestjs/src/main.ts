import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import multipart from '@fastify/multipart';
import { MAX_FILE_SIZE_LIMIT, MAX_FILES_LIMIT } from './utils/constants';
import secureSession from '@fastify/secure-session';
import fastifyStaticPlugin from '@fastify/static';
import path from 'path';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  console.log(
    `Application is running on: http://localhost:${process.env.PORT!}`,
  );

  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: VERSION_NEUTRAL
  // })

  await app.register(multipart, {
    limits: {
      fileSize: MAX_FILE_SIZE_LIMIT, // 5 MB in bytes
      files: MAX_FILES_LIMIT,
    },
  });

  await app.register(secureSession, {
    secret: process.env.SESSION_SECRET!,
    salt: process.env.SESSION_SALT!,
  });


  await app.register(fastifyStaticPlugin, {
    root: path.join(process.cwd(), 'apps', 'queue-nestjs', 'public'),
    prefix: '/public/',
  });


  await app.listen(process.env.PORT!);
}
bootstrap();
