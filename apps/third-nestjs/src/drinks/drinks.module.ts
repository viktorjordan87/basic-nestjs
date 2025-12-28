import { forwardRef, Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { BeersModule } from '../beers/beers.module';

@Module({
  imports: [forwardRef(() => BeersModule)],
  controllers: [DrinksController],
  providers: [DrinksService],
  exports: [DrinksService],
})
export class DrinksModule {}
