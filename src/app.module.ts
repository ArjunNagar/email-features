import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailAuthModule } from './email-auth/email-auth.module';
import { DomainReputationService } from './domain-reputation/domain-reputation.service';
import { DomainReputationController } from './domain-reputation/domain-reputation.controller';
import { SpfGeneratorController } from './spf-generator/spf-generator.controller';
import { SpfGeneratorService } from './spf-generator/spf-generator.service';
import { DmarcService } from './dmarc-generator/dmarc-generator.service';
import { DmarcController } from './dmarc-generator/dmarc-generator.controller';
import { DkimGeneratorService } from './dkim-generator/dkim-generator.service';
import { DkimGeneratorController } from './dkim-generator/dkim-generator.controller';
import { EmailDeliverabilityService } from './email-deliverability/email-deliverability.service';
import { EmailDeliverabilityController } from './email-deliverability/email-deliverability.controller';

@Module({
  imports: [EmailAuthModule],
  controllers: [
    AppController,
    DomainReputationController,
    SpfGeneratorController,
    DmarcController,
    DkimGeneratorController,
    EmailDeliverabilityController,
  ],
  providers: [
    AppService,
    DomainReputationService,
    SpfGeneratorService,
    DmarcService,
    DkimGeneratorService,
    EmailDeliverabilityService,
  ],
})
export class AppModule {}
