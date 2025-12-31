import { Test, TestingModule } from '@nestjs/testing';
import { DiscoveriesController } from './discoveries.controller';
import { DiscoveriesService } from './discoveries.service';

describe('DiscoveriesController', () => {
  let controller: DiscoveriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscoveriesController],
      providers: [DiscoveriesService],
    }).compile();

    controller = module.get<DiscoveriesController>(DiscoveriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
