import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CachesService } from './caches.service';
import { CreateCachDto } from './dto/create-cach.dto';
import { UpdateCachDto } from './dto/update-cach.dto';
import { CustomersService } from '../customers/customers.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('caches')
export class CachesController {
  constructor(
    private readonly cachesService: CachesService,
    private readonly customersService: CustomersService,
  ) {}

  @Post()
  create(@Body() createCachDto: CreateCachDto) {
    return this.cachesService.create(createCachDto);
  }

  @Get()
  findAll() {
    return this.cachesService.findAll();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 1000)
  @Get('customers')
  getCustomers() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cachesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCachDto: UpdateCachDto) {
    return this.cachesService.update(+id, updateCachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cachesService.remove(+id);
  }

  @Post('key')
  setKey(
    @Body() { key, value, ttl }: { key: string; value: any; ttl?: number },
  ) {
    return this.cachesService.setKey(key, value, ttl);
  }

  @Get('key/:key')
  getKey(@Param('key') key: string) {
    return this.cachesService.getKey(key);
  }

  @Delete('key/:key')
  deleteKey(@Param('key') key: string) {
    return this.cachesService.deleteKey(key);
  }
}
