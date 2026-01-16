import { Test, TestingModule } from '@nestjs/testing';
import { VersioningUrlController } from './versioning-url.controller';
import { VersioningUrlService } from './versioning-url.service';

describe('VersioningUrlController', () => {
  let controller: VersioningUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersioningUrlController],
      providers: [VersioningUrlService],
    }).compile();

    controller = module.get<VersioningUrlController>(VersioningUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
