import { Test, TestingModule } from '@nestjs/testing';
import { DomainReputationService } from './domain-reputation.service';

describe('DomainReputationService', () => {
  let service: DomainReputationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainReputationService],
    }).compile();

    service = module.get<DomainReputationService>(DomainReputationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
