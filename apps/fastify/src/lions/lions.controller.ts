import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LionsService } from './lions.service';
import { CreateLionDto } from './dto/create-lion.dto';
import { UpdateLionDto } from './dto/update-lion.dto';

@Controller('lions')
export class LionsController {
  constructor(private readonly lionsService: LionsService) {}

  @Post()
  create(@Body() createLionDto: CreateLionDto) {
    return this.lionsService.create(createLionDto);
  }

  @Get()
  findAll() {
    return this.lionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLionDto: UpdateLionDto) {
    return this.lionsService.update(+id, updateLionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lionsService.remove(+id);
  }
}
