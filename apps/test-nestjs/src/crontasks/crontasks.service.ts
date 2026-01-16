import { Injectable, Logger } from '@nestjs/common';
import { CronExpression, SchedulerRegistry, Cron } from '@nestjs/schedule';

@Injectable()
export class CrontasksService {
  private readonly logger = new Logger(CrontasksService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug('Called when the current second is 10');
  }

  @Cron('15 * * * * *')
  handleCron2() {
    this.logger.debug('Called when the current second is 15');
  }

  private static readonly now = new Date();
  private static readonly oneMinute = 60 * 1000;
  private static readonly after1Minute = new Date(
    CrontasksService.now.getTime() + CrontasksService.oneMinute,
  );
  @Cron(CrontasksService.after1Minute)
  handleCron3() {
    this.logger.debug('Called after 1 minute ONCE from server start / restart');
  }
}
