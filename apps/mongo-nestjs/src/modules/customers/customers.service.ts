import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerDocument, CustomerType } from '../../db/schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}
  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerDocument> {
    return await this.customerModel.create(createCustomerDto);
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  async findByCustomerId(customerId: string): Promise<CustomerType | null> {
    const customer = await this.customerModel
      .findOne({ customerId })
      .lean<CustomerType>({ versionKey: false })
      .exec();
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerType | null> {
    return this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, {
        new: true,
      })
      .lean<CustomerType>({ versionKey: false })
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
