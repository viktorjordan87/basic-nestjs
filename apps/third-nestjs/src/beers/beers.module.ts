import { forwardRef, Module } from '@nestjs/common';
import { BeersService } from './beers.service';
import { BeersController } from './beers.controller';
import { DrinksModule } from '../drinks/drinks.module';

@Module({
  imports: [forwardRef(() => DrinksModule)],
  controllers: [BeersController],
  providers: [BeersService],
  exports: [BeersService],
})
export class BeersModule {}
