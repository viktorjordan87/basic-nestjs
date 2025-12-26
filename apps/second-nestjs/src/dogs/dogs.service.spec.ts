import { Test, TestingModule } from '@nestjs/testing';
import { DogsService } from './dogs.service';
import { mockDogsService } from './mock/dogs.mock-service';

describe('DogsService', () => {
  let service: DogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DogsService,
          useValue: mockDogsService,
        },
      ],
    }).compile();

    service = module.get<DogsService>(DogsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all dogs', () => {
    const result = service.findAll();
    expect(mockDogsService.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });

  it('should create a dog', () => {
    const createDto = { name: 'Rex', age: 2, breed: 'Bulldog' };
    const result = service.create(createDto);
    expect(mockDogsService.create).toHaveBeenCalledWith(createDto);
    expect(result).toHaveProperty('id', 1);
  });
});
