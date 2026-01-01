import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductType, ProductDocument } from '../../db/schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    return await this.productModel.create(createProductDto);
  }

  async findAll(): Promise<ProductType[]> {
    return await this.productModel.find().lean().exec();
  }

  async findOne(id: string): Promise<ProductType | null> {
    return await this.productModel.findById(id).lean().exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductType | null> {
    return await this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
      })
      .lean()
      .exec();
  }

  async remove(id: string): Promise<ProductType | null> {
    return await this.productModel.findByIdAndDelete(id).lean().exec();
  }

  // Example: Find product by barcode
  async findByBarcode(barCode: string): Promise<ProductType | null> {
    return await this.productModel.findOne({ barCode }).lean().exec();
  }

  // Example: Nested object retrieval - using select to get specific fields
  async findWithSelectedFields(id: string): Promise<ProductType | null> {
    return await this.productModel
      .findById(id)
      .select('name barCode')
      .lean()
      .exec();
  }

  // Example: Nested object retrieval - using lean() for plain JavaScript objects
  async findLean(id: string): Promise<ProductType | null> {
    return await this.productModel.findById(id).lean().exec();
  }

  // Example: Nested object retrieval - using projection in find
  async findAllWithProjection(): Promise<ProductType[]> {
    return await this.productModel
      .find({}, { name: 1, barCode: 1, _id: 1 })
      .lean()
      .exec();
  }

  // Example: Nested object retrieval - using populate (if Product had references)
  // This is a template for when you have references to other models
  async findWithPopulate(id: string): Promise<ProductType | null> {
    // Example: if Product had a reference field like:
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    // category: Category;
    // Then you would use: return await this.productModel.findById(id).populate('category').lean().exec();
    return await this.productModel.findById(id).lean().exec();
  }
}
