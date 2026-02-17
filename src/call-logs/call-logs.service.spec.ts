import { Test, TestingModule } from '@nestjs/testing';
import { PhoneUsageService } from './phone-usage.service';

describe('PhoneUsageService', () => {
  let service: PhoneUsageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneUsageService],
    }).compile();

    service = module.get<PhoneUsageService>(PhoneUsageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
