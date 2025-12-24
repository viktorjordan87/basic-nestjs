import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get('projection')
  findAllWithProjection() {
    return this.salesService.findAllWithProjection();
  }

  @Get('product/:productName')
  findByProductName(@Param('productName') productName: string) {
    return this.salesService.findByProductName(productName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Get('product-id/:productId')
  findByProductId(@Param('productId') productId: string) {
    return this.salesService.findByProductId(productId);
  }

  @Get('salesperson-id/:salesPersonId')
  findBySalesPersonId(@Param('salesPersonId') salesPersonId: string) {
    return this.salesService.findBySalesPersonId(salesPersonId);
  }

  @Get(':id/selected')
  findWithSelectedFields(@Param('id') id: string) {
    return this.salesService.findWithSelectedFields(id);
  }

  @Get(':id/lean')
  findLean(@Param('id') id: string) {
    return this.salesService.findLean(id);
  }

  @Get(':id/nested-populate')
  findWithNestedPopulate(@Param('id') id: string) {
    return this.salesService.findWithNestedPopulate(id);
  }

  @Get(':id/conditional-populate')
  findWithConditionalPopulate(@Param('id') id: string) {
    return this.salesService.findWithConditionalPopulate(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}
