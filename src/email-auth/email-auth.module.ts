import { Module } from '@nestjs/common';
import { EmailAuthService } from './email-auth.service';
import { EmailAuthController } from './email-auth.controller';

@Module({
  providers: [EmailAuthService],
  controllers: [EmailAuthController]
})
export class EmailAuthModule {}
