import { Test, TestingModule } from '@nestjs/testing';
import { PhoneUsageController } from './phone-usage.controller';

describe('PhoneUsageController', () => {
  let controller: PhoneUsageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneUsageController],
    }).compile();

    controller = module.get<PhoneUsageController>(PhoneUsageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
