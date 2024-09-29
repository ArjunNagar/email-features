import { Controller, Post, Body } from '@nestjs/common';
import { DmarcService } from './dmarc-generator.service';

@Controller('dmarc')
export class DmarcController {
  constructor(private readonly dmarcService: DmarcService) {}

  @Post('generate')
  generateDMARC(@Body() body: any): string {
    const {
      domain,
      policy,
      rua,
      ruf,
      subdomainPolicy,
      dkimAlignment,
      spfAlignment,
    } = body;

    const dmarcRecord = this.dmarcService.generateDMARC(
      domain,
      policy,
      rua,
      ruf,
      subdomainPolicy,
      dkimAlignment,
      spfAlignment,
    );

    return dmarcRecord;
  }
}
