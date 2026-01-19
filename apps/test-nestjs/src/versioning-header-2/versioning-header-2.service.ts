import { Injectable, Logger } from '@nestjs/common';
import { CreateVersioningHeader2Dto } from './dto/create-versioning-header-2.dto';
import { UpdateVersioningHeader2Dto } from './dto/update-versioning-header-2.dto';
import { CRONTASKS_NAMES } from '../crontasks/crontasks-names';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class VersioningHeader2Service {
  private readonly logger = new Logger(VersioningHeader2Service.name, {
    timestamp: true, // it doesn't work, don't add the ms difference
  });

  create(createVersioningHeader2Dto: CreateVersioningHeader2Dto) {
    return 'This action adds a new versioningHeader2';
  }

  findAllV1() {
    return `This action returns all versioningHeader2 V1`;
  }

  findAllV2() {
    return `This action returns all versioningHeader2 V2`;
  }

  findAll(schedulerRegistry: SchedulerRegistry) {
    this.logger.log('findAll');
    const cronTask = schedulerRegistry.getCronJob(CRONTASKS_NAMES.HANDLE_CRON4);
    void cronTask.fireOnTick();
    const nextExecutionDate = cronTask.nextDate();
    return `This action returns all versioningHeader2 V3 + V4 + and execute cron task ${CRONTASKS_NAMES.HANDLE_CRON4} + next execution date: ${nextExecutionDate.toISO()}`;
  }

  findWithoutVersion() {
    return `This action returns all versioningHeader2 without version`;
  }

  findOne(id: number) {
    return `This action returns a #${id} versioningHeader2`;
  }

  update(id: number, updateVersioningHeader2Dto: UpdateVersioningHeader2Dto) {
    return `This action updates a #${id} versioningHeader2`;
  }

  remove(id: number) {
    return `This action removes a #${id} versioningHeader2`;
  }
}
