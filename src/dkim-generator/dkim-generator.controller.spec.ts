import { Test, TestingModule } from '@nestjs/testing';
import { DkimGeneratorController } from './dkim-generator.controller';

describe('DkimGeneratorController', () => {
  let controller: DkimGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DkimGeneratorController],
    }).compile();

    controller = module.get<DkimGeneratorController>(DkimGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
