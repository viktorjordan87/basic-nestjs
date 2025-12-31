import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { DynamicConfigModule } from './config/dynamic-config.module';
import { DrinksModule } from './drinks/drinks.module';
import { BeersModule } from './beers/beers.module';
import { AnimalsModule } from './animals/animals.module';
import { CatsModule } from './cats/cats.module';
import { DiscoveriesModule } from './discoveries/discoveries.module';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvironmentConfig('third-nestjs')),
    DynamicConfigModule.register({ folder: 'config', isGlobal: true }),
    DrinksModule,
    BeersModule,
    AnimalsModule,
    CatsModule,
    DiscoveriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
