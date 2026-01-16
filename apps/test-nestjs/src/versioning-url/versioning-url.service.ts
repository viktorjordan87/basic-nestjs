import { Injectable } from '@nestjs/common';
import { CreateVersioningUrlDto } from './dto/create-versioning-url.dto';
import { UpdateVersioningUrlDto } from './dto/update-versioning-url.dto';

@Injectable()
export class VersioningUrlService {
  create(createVersioningUrlDto: CreateVersioningUrlDto) {
    return 'This action adds a new versioningUrl';
  }

  findAll() {
    return `This action returns all versioningUrl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} versioningUrl`;
  }

  update(id: number, updateVersioningUrlDto: UpdateVersioningUrlDto) {
    return `This action updates a #${id} versioningUrl`;
  }

  remove(id: number) {
    return `This action removes a #${id} versioningUrl`;
  }
}
