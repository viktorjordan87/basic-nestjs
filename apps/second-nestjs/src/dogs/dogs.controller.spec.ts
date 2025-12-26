import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { mockDogsService } from './mock/dogs.mock-service';

describe('DogsController', () => {
  let controller: DogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [
        {
          provide: DogsService,
          useValue: mockDogsService,
        },
      ],
    }).compile();

    controller = module.get<DogsController>(DogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all dogs', () => {
    const result = controller.findAll();
    expect(mockDogsService.findAll).toHaveBeenCalled();
    expect(result).toEqual([
      { id: 1, name: 'Buddy', age: 3, breed: 'Labrador' },
      { id: 2, name: 'Max', age: 5, breed: 'German Shepherd' },
    ]);
  });

  it('should create a dog', () => {
    const createDto = { name: 'Rex', age: 2, breed: 'Bulldog' };
    const result = controller.create(createDto);
    expect(mockDogsService.create).toHaveBeenCalledWith(createDto);
    expect(result).toHaveProperty('id', 1);
    expect(result).toHaveProperty('name', 'Rex');
  });
});
