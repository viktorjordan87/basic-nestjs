import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { DynamicConfigModule } from './config/dynamic-config.module';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvironmentConfig('third-nestjs')),
    DynamicConfigModule.register({ folder: 'config' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
