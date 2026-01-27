import { Module } from '@nestjs/common';
import { LionsService } from './lions.service';
import { LionsController } from './lions.controller';

@Module({
  controllers: [LionsController],
  providers: [LionsService],
})
export class LionsModule {}
