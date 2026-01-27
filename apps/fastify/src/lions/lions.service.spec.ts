import { Test, TestingModule } from '@nestjs/testing';
import { LionsService } from './lions.service';

describe('LionsService', () => {
  let service: LionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LionsService],
    }).compile();

    service = module.get<LionsService>(LionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
