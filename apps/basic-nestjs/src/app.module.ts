import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { CatModule } from './cat/cat.module';
import { DogModule } from './dog/dog.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvironmentConfig('basic-nestjs')),
    CatModule,
    DogModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
