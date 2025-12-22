import { Test, TestingModule } from '@nestjs/testing';
import { SecondNestjsController } from './second-nestjs.controller';
import { SecondNestjsService } from './second-nestjs.service';

describe('SecondNestjsController', () => {
  let secondNestjsController: SecondNestjsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SecondNestjsController],
      providers: [SecondNestjsService],
    }).compile();

    secondNestjsController = app.get<SecondNestjsController>(SecondNestjsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(secondNestjsController.getHello()).toBe('Hello World!');
    });
  });
});
