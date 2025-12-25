import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { CatModule } from './cat/cat.module';
import { DogModule } from './dog/dog.module';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvironmentConfig('basic-nestjs')),
    CatModule,
    DogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
