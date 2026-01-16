import { Test, TestingModule } from '@nestjs/testing';
import { VersioningHeaderService } from './versioning-header.service';

describe('VersioningHeaderService', () => {
  let service: VersioningHeaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersioningHeaderService],
    }).compile();

    service = module.get<VersioningHeaderService>(VersioningHeaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
