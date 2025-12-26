import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { HorsesModule } from './horses/horses.module';
import { GreetingModule } from './greeting/greeting.module';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvironmentConfig('second-nestjs')),
    CatsModule,
    DogsModule,
    HorsesModule,
    GreetingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
