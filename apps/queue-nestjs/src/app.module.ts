import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { BullmqModule, BullBoardModule } from './libs/bullmq';
import { FilesModule } from './files/files.module';

@Module({
  imports: [ConfigModule.forRoot(getEnvironmentConfig('queue-nestjs')), BullmqModule, BullBoardModule, FilesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
