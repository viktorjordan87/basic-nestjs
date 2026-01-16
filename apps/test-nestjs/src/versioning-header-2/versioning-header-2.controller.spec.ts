import { Test, TestingModule } from '@nestjs/testing';
import { VersioningHeader2Controller } from './versioning-header-2.controller';
import { VersioningHeader2Service } from './versioning-header-2.service';

describe('VersioningHeader2Controller', () => {
  let controller: VersioningHeader2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersioningHeader2Controller],
      providers: [VersioningHeader2Service],
    }).compile();

    controller = module.get<VersioningHeader2Controller>(VersioningHeader2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
