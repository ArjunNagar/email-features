import { Test, TestingModule } from '@nestjs/testing';
import { EmailDeliverabilityService } from './email-deliverability.service';

describe('EmailDeliverabilityService', () => {
  let service: EmailDeliverabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailDeliverabilityService],
    }).compile();

    service = module.get<EmailDeliverabilityService>(EmailDeliverabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
