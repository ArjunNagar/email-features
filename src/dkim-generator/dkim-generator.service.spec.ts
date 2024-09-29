import { Test, TestingModule } from '@nestjs/testing';
import { DkimGeneratorService } from './dkim-generator.service';

describe('DkimGeneratorService', () => {
  let service: DkimGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DkimGeneratorService],
    }).compile();

    service = module.get<DkimGeneratorService>(DkimGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
