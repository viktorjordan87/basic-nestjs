import { Injectable, Logger } from '@nestjs/common';
import {
  CronExpression,
  SchedulerRegistry,
  Cron,
  Interval,
  Timeout,
} from '@nestjs/schedule';
import { CRONTASKS_NAMES } from './crontasks-names';

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

  @Cron(CronExpression.EVERY_MINUTE, {
    name: CRONTASKS_NAMES.HANDLE_CRON4,
    timeZone: 'Europe/Budapest',
    disabled: false,
  })
  handleCron4() {
    this.logger.debug(
      'Called every minute in Budapest, cron job name: ' +
        CRONTASKS_NAMES.HANDLE_CRON4,
    );
  }

  @Interval(45 * 1000)
  handleCron5() {
    this.logger.debug('Called every 45 seconds');
  }

  @Timeout(5 * 1000)
  handleCron6() {
    this.logger.debug(
      'After server starts this is called after 5 seconds, and never again',
    );
  }
}
