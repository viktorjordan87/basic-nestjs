import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //URI versioning
  /*  app.enableVersioning({
    type: VersioningType.URI,
  }); */
  //Header versioning
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'X-API-Version',
  });
  const port = process.env.PORT ?? 3000;
  console.log(`Application is running on: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
