import { Test, TestingModule } from '@nestjs/testing';
import { DomainReputationController } from './domain-reputation.controller';

describe('DomainReputationController', () => {
  let controller: DomainReputationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainReputationController],
    }).compile();

    controller = module.get<DomainReputationController>(DomainReputationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
