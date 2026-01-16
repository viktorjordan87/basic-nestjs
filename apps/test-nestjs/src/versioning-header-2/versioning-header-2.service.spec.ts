import { Test, TestingModule } from '@nestjs/testing';
import { VersioningHeader2Service } from './versioning-header-2.service';

describe('VersioningHeader2Service', () => {
  let service: VersioningHeader2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersioningHeader2Service],
    }).compile();

    service = module.get<VersioningHeader2Service>(VersioningHeader2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
