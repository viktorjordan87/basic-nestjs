import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale, Product, User } from '../../db/schemas';
import { Model, Document, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Type for Sale with populated virtuals
type PopulatedSale = Omit<Sale, 'productId' | 'salesPersonId'> & {
  product: Product | null;
  salesPerson: User | null;
};

// Type for Sale document with populated virtuals
type PopulatedSaleDocument = Document & PopulatedSale;

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sale.name) private saleModel: Model<Sale>) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    return await this.saleModel.create(createSaleDto);
  }

  // Find all sales with populated Product and User using virtuals
  async findAll(): Promise<PopulatedSaleDocument[]> {
    const sales = await this.saleModel
      .find()
      .populate('product')
      .populate('salesPerson')
      .select('-createdAt -updatedAt -__v')
      .lean()
      .exec();

    const filteredSales = sales.map((sale) => {
      const saleObj = sale as Record<string, unknown>;
      delete saleObj.productId;
      delete saleObj.salesPersonId;
      return {
        ...saleObj,
      };
    });

    return filteredSales as unknown as PopulatedSaleDocument[];
  }

  // Find one sale with populated Product and User using virtuals
  async findOne(id: string): Promise<PopulatedSaleDocument | null> {
    return (await this.saleModel
      .findById(id)
      .populate('product')
      .populate('salesPerson')
      .select('-createdAt -updatedAt -__v')
      .exec()) as unknown as PopulatedSaleDocument | null;
  }

  async update(
    id: string,
    updateSaleDto: UpdateSaleDto,
  ): Promise<PopulatedSaleDocument | null> {
    return (await this.saleModel
      .findByIdAndUpdate(id, updateSaleDto, {
        new: true,
      })
      .populate('product')
      .populate('salesPerson')
      .select('-createdAt -updatedAt -__v')
      .exec()) as unknown as PopulatedSaleDocument | null;
  }

  async remove(id: string): Promise<Sale | null> {
    return await this.saleModel.findByIdAndDelete(id).exec();
  }

  // Example 1: Find sales by product name (using populate)
  async findByProductName(
    productName: string,
  ): Promise<PopulatedSaleDocument[]> {
    const sales = (await this.saleModel
      .find()
      .populate({
        path: 'product',
        match: { name: productName },
      })
      .populate('salesPerson')
      .select('-createdAt -updatedAt -__v')
      .exec()) as unknown as PopulatedSaleDocument[];
    return sales.filter(
      (sale) => sale.product !== null && sale.product !== undefined,
    );
  }

  // Example 2: Populate with selected fields only
  async findWithSelectedFields(
    id: string,
  ): Promise<PopulatedSaleDocument | null> {
    return (await this.saleModel
      .findById(id)
      .populate('product', 'name barCode')
      .populate('salesPerson', 'name email')
      .select('-createdAt -updatedAt -__v')
      .exec()) as unknown as PopulatedSaleDocument | null;
  }

  // Example 3: Using lean() with populate for plain JavaScript objects
  async findLean(id: string): Promise<PopulatedSale | null> {
    return (await this.saleModel
      .findById(id)
      .populate('product')
      .populate('salesPerson')
      .select('-createdAt -updatedAt -__v')
      .lean()
      .exec()) as unknown as PopulatedSale | null;
  }

  // Example 4: Populate nested references (if Product had a category reference)
  async findWithNestedPopulate(
    id: string,
  ): Promise<PopulatedSaleDocument | null> {
    return (await this.saleModel
      .findById(id)
      .populate({
        path: 'product',
        // If Product had a categoryId reference, you could do:
        // populate: {
        //   path: 'categoryId',
        //   model: 'Category',
        // },
      })
      .populate('salesPerson')
      .select('-createdAt -updatedAt -__v')
      .exec()) as unknown as PopulatedSaleDocument | null;
  }

  // Example 5: Find all with projection (without populate) - returns IDs only
  async findAllWithProjection(): Promise<
    Array<{
      _id: Types.ObjectId;
      productId: Types.ObjectId;
      salesPersonId: Types.ObjectId;
    }>
  > {
    return (await this.saleModel
      .find({}, { productId: 1, salesPersonId: 1, _id: 1 })
      .lean()
      .exec()) as unknown as Array<{
      _id: Types.ObjectId;
      productId: Types.ObjectId;
      salesPersonId: Types.ObjectId;
    }>;
  }

  // Example 6: Populate with conditions
  async findWithConditionalPopulate(
    id: string,
  ): Promise<PopulatedSaleDocument | null> {
    return (await this.saleModel
      .findById(id)
      .populate({
        path: 'product',
        match: { name: { $regex: /^A/ } }, // Only populate if product name starts with 'A'
      })
      .populate('salesPerson')
      .select('-createdAt -updatedAt -__v')
      .exec()) as unknown as PopulatedSaleDocument | null;
  }

  // Example 7: Find sales by product ID
  async findByProductId(productId: string): Promise<PopulatedSaleDocument[]> {
    return (await this.saleModel
      .find({ productId })
      .populate('product')
      .populate('salesPerson')
      .select('-createdAt -updatedAt -__v')
      .exec()) as unknown as PopulatedSaleDocument[];
  }

  // Example 8: Find sales by sales person ID
  async findBySalesPersonId(
    salesPersonId: string,
  ): Promise<PopulatedSaleDocument[]> {
    return (await this.saleModel
      .find({ salesPersonId })
      .populate('product')
      .populate('salesPerson')
      .select('-createdAt -updatedAt -__v')
      .exec()) as unknown as PopulatedSaleDocument[];
  }
}
