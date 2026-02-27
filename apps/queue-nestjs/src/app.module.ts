import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { BullmqModule, BullBoardModule } from './libs/bullmq';

@Module({
  imports: [ConfigModule.forRoot(getEnvironmentConfig('queue-nestjs')), BullmqModule, BullBoardModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
