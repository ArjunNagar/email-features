import { Test, TestingModule } from '@nestjs/testing';
import { SpfGeneratorService } from './spf-generator.service';

describe('SpfGeneratorService', () => {
  let service: SpfGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpfGeneratorService],
    }).compile();

    service = module.get<SpfGeneratorService>(SpfGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
