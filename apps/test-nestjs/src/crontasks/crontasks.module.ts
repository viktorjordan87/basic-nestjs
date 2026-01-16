import { Module } from '@nestjs/common';
import { CrontasksService } from './crontasks.service';

@Module({
  providers: [CrontasksService],
})
export class CrontasksModule {}
