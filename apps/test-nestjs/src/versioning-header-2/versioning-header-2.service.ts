import { Injectable } from '@nestjs/common';
import { CreateVersioningHeader2Dto } from './dto/create-versioning-header-2.dto';
import { UpdateVersioningHeader2Dto } from './dto/update-versioning-header-2.dto';

@Injectable()
export class VersioningHeader2Service {
  create(createVersioningHeader2Dto: CreateVersioningHeader2Dto) {
    return 'This action adds a new versioningHeader2';
  }

  findAllV1() {
    return `This action returns all versioningHeader2 V1`;
  }

  findAllV2() {
    return `This action returns all versioningHeader2 V2`;
  }

  findAll() {
    return `This action returns all versioningHeader2 V3 + V4`;
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
