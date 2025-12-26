import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { HorsesModule } from '../horses/horses.module';

@Module({
  imports: [HorsesModule],
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      useClass: CatsService,
    },
  ],
  exports: [CatsService],
})
export class CatsModule {}
