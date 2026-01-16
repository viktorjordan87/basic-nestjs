import { Injectable } from '@nestjs/common';
import { CreateVersioningHeaderDto } from './dto/create-versioning-header.dto';
import { UpdateVersioningHeaderDto } from './dto/update-versioning-header.dto';

@Injectable()
export class VersioningHeaderService {
  create(createVersioningHeaderDto: CreateVersioningHeaderDto) {
    return 'This action adds a new versioningHeader';
  }

  findAll() {
    return `This action returns all versioningHeader`;
  }

  findOne(id: number) {
    return `This action returns a #${id} versioningHeader`;
  }

  update(id: number, updateVersioningHeaderDto: UpdateVersioningHeaderDto) {
    return `This action updates a #${id} versioningHeader`;
  }

  remove(id: number) {
    return `This action removes a #${id} versioningHeader`;
  }
}
