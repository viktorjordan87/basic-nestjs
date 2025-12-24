import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../db/schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  // Example: Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  // Example: Nested object retrieval - using select to get specific fields
  async findWithSelectedFields(id: string): Promise<User | null> {
    return await this.userModel.findById(id).select('name email').exec();
  }

  // Example: Nested object retrieval - using lean() for plain JavaScript objects
  async findLean(id: string): Promise<any> {
    return await this.userModel.findById(id).lean().exec();
  }
}
