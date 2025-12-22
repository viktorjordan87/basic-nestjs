import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';

@Module({
  imports: [ConfigModule.forRoot(getEnvironmentConfig('basic-nestjs'))],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
