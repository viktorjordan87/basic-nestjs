import { INestApplication, Logger } from '@nestjs/common';

/**
 * Handles graceful shutdown of the NestJS application.
 * Ensures all pending operations complete before shutting down.
 */
export class GracefulShutdownHandler {
  private static readonly logger = new Logger('GracefulShutdown');

  /**
   * Handles graceful shutdown when a signal is received.
   * @param app - The NestJS application instance
   * @param signal - The shutdown signal received
   */
  static async handle(app: INestApplication, signal: string): Promise<void> {
    this.logger.log(`🛑 Received ${signal}, starting graceful shutdown...`);

    try {
      // Stop accepting new connections
      await app.close();
      this.logger.log('✅ Application closed successfully');
      process.exit(0);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `❌ Error during shutdown: ${errorMessage}`,
        errorStack,
      );
      process.exit(1);
    }
  }

  /**
   * Sets up signal handlers for graceful shutdown.
   * @param app - The NestJS application instance
   */
  static setupSignalHandlers(app: INestApplication): void {
    // Handle shutdown signals
    process.on('SIGTERM', () => {
      void this.handle(app, 'SIGTERM');
    });
    process.on('SIGINT', () => {
      void this.handle(app, 'SIGINT');
    });

    // Handle uncaught exceptions and unhandled rejections
    process.on('uncaughtException', (error) => {
      this.logger.error('❌ Uncaught Exception:', error);
      void this.handle(app, 'uncaughtException');
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.logger.error(
        '❌ Unhandled Rejection at:',
        promise,
        'reason:',
        reason,
      );
      void this.handle(app, 'unhandledRejection');
    });
  }
}
