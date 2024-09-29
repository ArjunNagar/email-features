import { Controller, Get, Query } from '@nestjs/common';
import { DomainReputationService } from './domain-reputation.service';

@Controller('domain-reputation')
export class DomainReputationController {
  constructor(
    private readonly domainReputationService: DomainReputationService,
  ) {}

  @Get('check')
  async checkDomain(@Query('domain') domain: string) {
    const score = await this.domainReputationService.calculateScore(domain);
    return { domain, score };
  }
}
