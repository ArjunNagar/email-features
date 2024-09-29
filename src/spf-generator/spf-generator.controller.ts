// src/spf-generator/spf-generator.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { SpfGeneratorService } from './spf-generator.service';

@Controller('spf-generator')
export class SpfGeneratorController {
  constructor(private readonly spfGeneratorService: SpfGeneratorService) {}

  @Post('generate')
  generateSPF(
    @Body()
    body: {
      domain: string;
      ip4Addresses: string[];
      ip6Addresses: string[];
      includeDomains: string[];
      mxIncluded: boolean;
    },
  ) {
    const { domain, ip4Addresses, ip6Addresses, includeDomains, mxIncluded } =
      body;
    const spfRecord = this.spfGeneratorService.generateSPF(
      domain,
      ip4Addresses,
      ip6Addresses,
      includeDomains,
      mxIncluded,
    );
    return { spfRecord };
  }
}
