import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VersioningUrlService } from './versioning-url.service';
import { CreateVersioningUrlDto } from './dto/create-versioning-url.dto';
import { UpdateVersioningUrlDto } from './dto/update-versioning-url.dto';

@Controller({
  path: 'versioning-url',
  version: '1',
})
export class VersioningUrlController {
  constructor(private readonly versioningUrlService: VersioningUrlService) {}

  @Post()
  create(@Body() createVersioningUrlDto: CreateVersioningUrlDto) {
    return this.versioningUrlService.create(createVersioningUrlDto);
  }

  @Get()
  findAll() {
    return this.versioningUrlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versioningUrlService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVersioningUrlDto: UpdateVersioningUrlDto,
  ) {
    return this.versioningUrlService.update(+id, updateVersioningUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versioningUrlService.remove(+id);
  }
}
