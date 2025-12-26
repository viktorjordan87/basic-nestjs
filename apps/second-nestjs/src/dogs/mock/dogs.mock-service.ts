import { CreateDogDto } from '../dto/create-dog.dto';
import { UpdateDogDto } from '../dto/update-dog.dto';

export const mockDogsService = {
  create: jest.fn((createDogDto: CreateDogDto) => {
    return {
      id: 1,
      ...createDogDto,
      message: 'Mock: This action adds a new dog',
    };
  }),

  findAll: jest.fn(() => {
    return [
      { id: 1, name: 'Buddy', age: 3, breed: 'Labrador' },
      { id: 2, name: 'Max', age: 5, breed: 'German Shepherd' },
    ];
  }),

  findOne: jest.fn((id: number) => {
    return { id, name: 'Buddy', age: 3, breed: 'Labrador' };
  }),

  update: jest.fn((id: number, updateDogDto: UpdateDogDto) => {
    return { id, ...updateDogDto, message: 'Mock: This action updates a dog' };
  }),

  remove: jest.fn((id: number) => {
    return { id, message: 'Mock: This action removes a dog' };
  }),
};
