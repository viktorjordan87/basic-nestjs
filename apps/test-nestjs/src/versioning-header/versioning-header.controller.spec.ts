import { Test, TestingModule } from '@nestjs/testing';
import { VersioningHeaderController } from './versioning-header.controller';
import { VersioningHeaderService } from './versioning-header.service';

describe('VersioningHeaderController', () => {
  let controller: VersioningHeaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersioningHeaderController],
      providers: [VersioningHeaderService],
    }).compile();

    controller = module.get<VersioningHeaderController>(VersioningHeaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
