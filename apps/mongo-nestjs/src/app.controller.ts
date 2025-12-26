import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GracefulShutdownHandler } from './shutdown/graceful-shutdown.handler';
import { INestApplication } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Development-only endpoint to test graceful shutdown.
   * ⚠️ WARNING: This will shut down the server!
   * Only works in development environment.
   */
  @Post('shutdown')
  testShutdown(): { message: string } {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Shutdown endpoint is disabled in production');
    }

    // Get app instance from global (set in main.ts)
    const app: INestApplication | undefined = global.appInstance;
    if (!app) {
      throw new Error('App instance not available');
    }

    // Trigger graceful shutdown asynchronously
    setTimeout(() => {
      void GracefulShutdownHandler.handle(app, 'TEST_SHUTDOWN');
    }, 100);

    return {
      message: 'Graceful shutdown initiated. Server will close in a moment...',
    };
  }
}
