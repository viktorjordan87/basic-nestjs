import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { VersioningUrlModule } from './versioning-url/versioning-url.module';
import { VersioningHeaderModule } from './versioning-header/versioning-header.module';
import { VersioningHeader2Module } from './versioning-header-2/versioning-header-2.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CrontasksModule } from './crontasks/crontasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvironmentConfig('test-nestjs')),
    CatsModule,
    VersioningUrlModule,
    VersioningHeaderModule,
    VersioningHeader2Module,
    ScheduleModule.forRoot(),
    CrontasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
