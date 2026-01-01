import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GracefulShutdownHandler } from './shutdown/graceful-shutdown.handler';

// Store app instance globally for testing purposes (development only)
declare global {
  var appInstance: Awaited<ReturnType<typeof NestFactory.create>> | undefined;
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Store app instance for testing (development only)
  if (process.env.NODE_ENV !== 'production') {
    global.appInstance = app;
  }

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: false, // Don't throw error if non-whitelisted properties are sent, Perfect for versioning APIs
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Enable implicit type conversion
      },
      disableErrorMessages: false, //some production environments prefer to disable detailed errors, then set to true
    }),
  );

  // Enable graceful shutdown
  app.enableShutdownHooks();

  const port = process.env.port ?? 3000;
  await app.listen(port);
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(
    `🧪 Test graceful shutdown: POST http://localhost:${port}/shutdown (dev only)`,
  );
  logger.log(`🧪 Or send SIGTERM: kill -TERM ${process.pid}`);

  // Setup graceful shutdown handlers
  GracefulShutdownHandler.setupSignalHandlers(app);
}

void bootstrap();
