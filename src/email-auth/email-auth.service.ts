import { Injectable } from '@nestjs/common';
import * as net from 'net';
import * as dns from 'dns';

@Injectable()
export class EmailAuthService {
  // Validate email format using regex
  private validateEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Check if the domain uses webmail (common webmail domains)
  private isWebmailDomain(domain: string): boolean {
    const webmailDomains = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'hotmail.com',
    ];
    return webmailDomains.includes(domain);
  }

  // Check if the domain has MX records (i.e., can receive emails)
  private verifyMXRecords(domain: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      dns.resolveMx(domain, (err, addresses) => {
        if (err || !addresses.length) {
          reject('No MX records found or domain does not exist.');
        } else {
          resolve(true);
        }
      });
    });
  }

  // Check if email exists by connecting to the SMTP server
  private verifyEmailSMTP(email: string, smtpServer: string): Promise<string> {
    return new Promise((resolve) => {
      const domain = email.split('@')[1];
      let step = 0; // Track which step of the SMTP handshake we're in
      const socket = net.createConnection(25, smtpServer, () => {
        socket.write(`HELO ${domain}\r\n`);
      });

      socket.on('data', (data) => {
        const response = data.toString();
        if (step === 0 && response.startsWith('220')) {
          // 220 is the greeting, now we send MAIL FROM
          socket.write(`MAIL FROM:<test@${domain}>\r\n`);
          step++;
        } else if (step === 1 && response.startsWith('250')) {
          // 250 after MAIL FROM is OK, now we send RCPT TO
          socket.write(`RCPT TO:<${email}>\r\n`);
          step++;
        } else if (step === 2 && response.startsWith('250')) {
          // 250 after RCPT TO means the email is valid
          resolve('Valid');
          socket.end();
        } else if (response.startsWith('550')) {
          // 550 means the email address does not exist
          resolve('Invalid');
          socket.end();
        } else {
          resolve(`Unexpected response: ${response}`);
          socket.end();
        }
      });

      socket.on('error', (err) => {
        resolve(`Error connecting to SMTP server: ${err.message}`);
      });

      socket.on('end', () => {
        console.log('SMTP connection closed.');
      });
    });
  }

  // Main function to verify email
  async verifyEmail(email: string) {
    const domain = email.split('@')[1];

    // 1. Email Format
    const formatValid = this.validateEmailFormat(email)
      ? 'Valid'
      : 'Invalid format';

    // 2. Check if the domain is a webmail provider
    const type = this.isWebmailDomain(domain) ? 'Webmail' : 'Non-webmail';

    // 3. Check MX records
    let serverStatus = 'Invalid';
    try {
      const mxValid = await this.verifyMXRecords(domain);
      serverStatus = mxValid ? 'Valid' : 'Invalid';
    } catch (error) {
      console.log(`Server status: ${error}`);
    }

    // 4. SMTP check to verify if the email exists
    let emailStatus = 'Cannot validate email (invalid MX records).';
    if (serverStatus === 'Valid') {
      const smtpServer = 'gmail-smtp-in.l.google.com'; // Adjust for other domains
      emailStatus = await this.verifyEmailSMTP(email, smtpServer);
    }

    return {
      formatValid,
      type,
      serverStatus,
      emailStatus,
    };
  }
}
