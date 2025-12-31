import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiscoveriesService } from './discoveries.service';
import { CreateDiscoveryDto } from './dto/create-discovery.dto';
import { UpdateDiscoveryDto } from './dto/update-discovery.dto';
import { FeatureFlag } from '../decorators/feature-flag.decorator';

@Controller('discoveries')
export class DiscoveriesController {
  constructor(private readonly discoveriesService: DiscoveriesService) {}

  @Post()
  create(@Body() createDiscoveryDto: CreateDiscoveryDto) {
    return this.discoveriesService.create(createDiscoveryDto);
  }

  @Get()
  findAll() {
    return this.discoveriesService.findAll();
  }

  @Get('providers')
  getProviders() {
    return this.discoveriesService.getAllProviders();
  }

  @Get('controllers')
  getControllers() {
    return this.discoveriesService.getAllControllers();
  }

  @FeatureFlag('experimental-feature')
  @Get('instances')
  getInstances() {
    return this.discoveriesService.getInstances();
  }

  @Get('feature-flags')
  getFeatureFlags() {
    return this.discoveriesService.getFeatureFlags();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discoveriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscoveryDto: UpdateDiscoveryDto,
  ) {
    return this.discoveriesService.update(+id, updateDiscoveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discoveriesService.remove(+id);
  }
}
