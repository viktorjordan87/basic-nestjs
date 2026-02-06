import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LionsModule } from './lions/lions.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [ConfigModule.forRoot(getEnvironmentConfig('fastify')), LionsModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
