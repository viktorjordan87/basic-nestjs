import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // VERSION_NEUTRAL,
} from '@nestjs/common';
import { VersioningHeaderService } from './versioning-header.service';
import { CreateVersioningHeaderDto } from './dto/create-versioning-header.dto';
import { UpdateVersioningHeaderDto } from './dto/update-versioning-header.dto';

@Controller({
  path: 'versioning-header',
  version: '1.1',
  // version: VERSION_NEUTRAL, --means that the controller will be used for all versions
})
export class VersioningHeaderController {
  constructor(
    private readonly versioningHeaderService: VersioningHeaderService,
  ) {}

  @Post()
  create(@Body() createVersioningHeaderDto: CreateVersioningHeaderDto) {
    return this.versioningHeaderService.create(createVersioningHeaderDto);
  }

  @Get()
  findAll() {
    return this.versioningHeaderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versioningHeaderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVersioningHeaderDto: UpdateVersioningHeaderDto,
  ) {
    return this.versioningHeaderService.update(+id, updateVersioningHeaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versioningHeaderService.remove(+id);
  }
}
