import { Test, TestingModule } from '@nestjs/testing';
import { SpfGeneratorController } from './spf-generator.controller';

describe('SpfGeneratorController', () => {
  let controller: SpfGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpfGeneratorController],
    }).compile();

    controller = module.get<SpfGeneratorController>(SpfGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
