import { Controller, Post, Body } from '@nestjs/common';
import { EmailAuthService } from './email-auth.service';

@Controller('email-auth')
export class EmailAuthController {
  constructor(private readonly emailAuthService: EmailAuthService) {}

  @Post('verify')
  async verifyEmail(@Body('email') email: string) {
    const result = await this.emailAuthService.verifyEmail(email);
    return result;
  }
}
