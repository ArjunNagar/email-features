import { Test, TestingModule } from '@nestjs/testing';
import { DmarcGeneratorService } from './dmarc-generator.service';

describe('DmarcGeneratorService', () => {
  let service: DmarcGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DmarcGeneratorService],
    }).compile();

    service = module.get<DmarcGeneratorService>(DmarcGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
