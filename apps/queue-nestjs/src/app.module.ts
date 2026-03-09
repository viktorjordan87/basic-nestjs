import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { BullmqModule, BullBoardModule } from './libs/bullmq';
import { FilesModule } from './modules/files/files.module';
import { ImageConsumer, ImageEventListeners } from './queues/consumers';
import { ExternalsModule } from './modules/externals/externals.module';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvironmentConfig('queue-nestjs')),
    BullmqModule,
    BullBoardModule,
    FilesModule,
    ExternalsModule,
    SessionsModule,
  ],
  controllers: [],
  providers: [ImageConsumer, ImageEventListeners],
})
export class AppModule { }
