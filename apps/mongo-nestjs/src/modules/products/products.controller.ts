import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('projection')
  findAllWithProjection() {
    return this.productsService.findAllWithProjection();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('barcode/:barCode')
  findByBarcode(@Param('barCode') barCode: string) {
    return this.productsService.findByBarcode(barCode);
  }

  @Get(':id/selected')
  findWithSelectedFields(@Param('id') id: string) {
    return this.productsService.findWithSelectedFields(id);
  }

  @Get(':id/lean')
  findLean(@Param('id') id: string) {
    return this.productsService.findLean(id);
  }

  @Get(':id/populate')
  findWithPopulate(@Param('id') id: string) {
    return this.productsService.findWithPopulate(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
