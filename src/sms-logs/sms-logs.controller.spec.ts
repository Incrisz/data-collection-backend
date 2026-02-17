import { Test, TestingModule } from '@nestjs/testing';
import { SmsTransactionsController } from './sms-transactions.controller';

describe('SmsTransactionsController', () => {
  let controller: SmsTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsTransactionsController],
    }).compile();

    controller = module.get<SmsTransactionsController>(SmsTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
