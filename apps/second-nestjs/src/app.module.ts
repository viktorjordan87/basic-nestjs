import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { HorsesModule } from './horses/horses.module';
import { GreetingModule } from './greeting/greeting.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvironmentConfig('second-nestjs')),
    CatsModule,
    DogsModule,
    HorsesModule,
    GreetingModule,
    // https://docs.nestjs.com/techniques/events
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- EventEmitterModule types not resolved in this project's tsconfig
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      maxListeners: 10,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
