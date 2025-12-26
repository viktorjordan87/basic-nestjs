import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
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
