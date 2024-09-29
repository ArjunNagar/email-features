import { Test, TestingModule } from '@nestjs/testing';
import { EmailDeliverabilityController } from './email-deliverability.controller';

describe('EmailDeliverabilityController', () => {
  let controller: EmailDeliverabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailDeliverabilityController],
    }).compile();

    controller = module.get<EmailDeliverabilityController>(EmailDeliverabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
