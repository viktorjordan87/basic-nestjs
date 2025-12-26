import { Module } from '@nestjs/common';
import { HorsesService } from './horses.service';
import { HorsesController } from './horses.controller';

@Module({
  controllers: [HorsesController],
  providers: [
    {
      provide: 'HORSES_SERVICE',
      useClass: HorsesService,
    },
  ],
  exports: ['HORSES_SERVICE'],
})
export class HorsesModule {}
