import { Controller, Post, Body } from '@nestjs/common';
import { DkimGeneratorService } from './dkim-generator.service';

@Controller('dkim')
export class DkimGeneratorController {
  constructor(private readonly dkimGeneratorService: DkimGeneratorService) {}

  @Post('generate')
  generateDKIM(
    @Body() body: { selector: string; domain: string; keyLength: number },
  ): { dkimRecord: string; privateKey: string } {
    const { selector, domain, keyLength } = body;

    const { publicKey, privateKey } =
      this.dkimGeneratorService.generateRSAKeyPair(keyLength);
    const dkimRecord = this.dkimGeneratorService.generateDKIM(
      selector,
      domain,
      publicKey,
    );

    return { dkimRecord, privateKey };
  }
}
