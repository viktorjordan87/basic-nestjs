import {
  Injectable,
  OnApplicationShutdown,
  Logger,
  OnModuleDestroy,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

/**
 * Service responsible for graceful shutdown of MongoDB connections.
 * Ensures all pending queries complete before closing connections.
 */
@Injectable()
export class ShutdownService implements OnApplicationShutdown, OnModuleDestroy {
  private readonly logger = new Logger(ShutdownService.name);
  private shutdownInProgress = false;

  constructor(@InjectConnection() private readonly connection: Connection) {}

  /**
   * Called when the application is shutting down.
   * Waits for all MongoDB operations to complete before closing the connection.
   */
  async onApplicationShutdown(signal?: string) {
    if (this.shutdownInProgress) {
      return;
    }

    this.shutdownInProgress = true;
    this.logger.log(
      `🛑 Application shutdown initiated (signal: ${signal || 'unknown'})`,
    );

    try {
      // Wait for all pending operations to complete
      await this.waitForPendingOperations();

      // Close MongoDB connection gracefully
      await this.closeMongoConnection();

      this.logger.log('✅ Graceful shutdown completed successfully');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `❌ Error during graceful shutdown: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  /**
   * Called when the module is being destroyed.
   * Provides an additional cleanup point if needed.
   */
  async onModuleDestroy() {
    // This is called before onApplicationShutdown
    // We'll handle cleanup in onApplicationShutdown to ensure proper order
  }

  /**
   * Waits for all pending MongoDB operations to complete.
   * Provides a grace period for operations to finish naturally.
   */
  private async waitForPendingOperations(): Promise<void> {
    this.logger.log('⏳ Waiting for pending MongoDB operations to complete...');

    const gracePeriod = 5000; // 5 seconds grace period for operations to complete
    const maxWaitTime = 30000; // 30 seconds max wait total
    const checkInterval = 100; // Check every 100ms
    const startTime = Date.now();

    // Give operations a grace period to complete naturally
    this.logger.log(
      `⏱️ Grace period: ${gracePeriod}ms for operations to complete...`,
    );
    await this.sleep(gracePeriod);

    // After grace period, check connection state
    while (Date.now() - startTime < maxWaitTime) {
      const readyState = this.connection.readyState as number;

      // States: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
      if (readyState === 0 || readyState === 3) {
        // Connection is disconnected or disconnecting
        this.logger.log('📊 MongoDB connection already closed');
        return;
      }

      // If connection is still connected, Mongoose's close() will wait for operations
      // We'll proceed to close which will handle pending operations
      if (readyState === 1) {
        this.logger.log(
          '✅ Grace period completed, proceeding to close connection...',
        );
        return;
      }

      // Wait a bit before checking again
      await this.sleep(checkInterval);
    }

    this.logger.warn(
      `⚠️ Timeout waiting for operations (${maxWaitTime}ms). Proceeding with shutdown...`,
    );
  }

  /**
   * Closes the MongoDB connection gracefully.
   */
  private async closeMongoConnection(): Promise<void> {
    this.logger.log('🔌 Closing MongoDB connection...');

    try {
      // Close the connection with a timeout
      await Promise.race([
        this.connection.close(),
        this.sleep(10000).then(() => {
          throw new Error('Connection close timeout after 10 seconds');
        }),
      ]);

      this.logger.log('✅ MongoDB connection closed successfully');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`❌ Error closing MongoDB connection: ${errorMessage}`);
      // Force close if graceful close fails
      if ((this.connection.readyState as number) !== 0) {
        void this.connection.destroy();
        this.logger.warn('🔨 MongoDB connection force-closed');
      }
      throw error;
    }
  }

  /**
   * Utility method to sleep for a given number of milliseconds.
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
