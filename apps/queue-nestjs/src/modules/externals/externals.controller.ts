import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExternalsService } from './externals.service';
import { CreateExternalDto } from './dto/create-external.dto';
import { UpdateExternalDto } from './dto/update-external.dto';
import { first } from 'rxjs';

@Controller('externals')
export class ExternalsController {
  constructor(private readonly externalsService: ExternalsService) { }

  @Post()
  create(@Body() createExternalDto: CreateExternalDto) {
    return this.externalsService.create(createExternalDto);
  }

  @Get()
  findAll() {
    return this.externalsService.findAll();
  }

  @Get('name')

  findByName(@Query('first_name') first_name: string) {
    return this.externalsService.findByName(first_name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.externalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExternalDto: UpdateExternalDto) {
    return this.externalsService.update(+id, updateExternalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.externalsService.remove(+id);
  }
}
