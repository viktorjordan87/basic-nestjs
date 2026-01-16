import { Test, TestingModule } from '@nestjs/testing';
import { VersioningUrlService } from './versioning-url.service';

describe('VersioningUrlService', () => {
  let service: VersioningUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersioningUrlService],
    }).compile();

    service = module.get<VersioningUrlService>(VersioningUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
