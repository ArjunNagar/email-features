import { Test, TestingModule } from '@nestjs/testing';
import { DmarcGeneratorController } from './dmarc-generator.controller';

describe('DmarcGeneratorController', () => {
  let controller: DmarcGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DmarcGeneratorController],
    }).compile();

    controller = module.get<DmarcGeneratorController>(DmarcGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
