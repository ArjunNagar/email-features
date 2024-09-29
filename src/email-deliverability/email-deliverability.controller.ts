import { Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { EmailDeliverabilityService } from './email-deliverability.service';
import { Response } from 'express';

@Controller('deliverability')
export class EmailDeliverabilityController {
  constructor(
    private readonly deliverabilityService: EmailDeliverabilityService,
  ) {}

  @Post('test')
  async testDeliverability(@Res() res: Response) {
    try {
      const result = await this.deliverabilityService.sendEmailAndCheck();
      return res.status(HttpStatus.OK).json({ message: result });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
