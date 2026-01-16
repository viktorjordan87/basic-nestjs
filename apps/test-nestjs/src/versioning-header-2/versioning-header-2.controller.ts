import { SchedulerRegistry } from '@nestjs/schedule';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { VersioningHeader2Service } from './versioning-header-2.service';
import { CreateVersioningHeader2Dto } from './dto/create-versioning-header-2.dto';
import { UpdateVersioningHeader2Dto } from './dto/update-versioning-header-2.dto';

@Controller('versioning-header-2')
export class VersioningHeader2Controller {
  constructor(
    private readonly versioningHeader2Service: VersioningHeader2Service,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Post()
  create(@Body() createVersioningHeader2Dto: CreateVersioningHeader2Dto) {
    return this.versioningHeader2Service.create(createVersioningHeader2Dto);
  }

  @Get()
  @Version('1')
  findAllV1() {
    return this.versioningHeader2Service.findAllV1();
  }

  @Get()
  @Version('2')
  findAllV2() {
    return this.versioningHeader2Service.findAllV2();
  }

  @Get()
  @Version(['3', '4'])
  findAll() {
    return this.versioningHeader2Service.findAll(this.schedulerRegistry);
  }

  @Get()
  findWithoutVersion() {
    return this.versioningHeader2Service.findWithoutVersion();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versioningHeader2Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVersioningHeader2Dto: UpdateVersioningHeader2Dto,
  ) {
    return this.versioningHeader2Service.update(
      +id,
      updateVersioningHeader2Dto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versioningHeader2Service.remove(+id);
  }
}
