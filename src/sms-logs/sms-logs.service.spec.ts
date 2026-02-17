import { Test, TestingModule } from '@nestjs/testing';
import { SmsTransactionsService } from './sms-transactions.service';

describe('SmsTransactionsService', () => {
  let service: SmsTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsTransactionsService],
    }).compile();

    service = module.get<SmsTransactionsService>(SmsTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
