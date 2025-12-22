import { Module } from '@nestjs/common';
import { SecondNestjsController } from './second-nestjs.controller';
import { SecondNestjsService } from './second-nestjs.service';

@Module({
  imports: [],
  controllers: [SecondNestjsController],
  providers: [SecondNestjsService],
})
export class SecondNestjsModule {}
