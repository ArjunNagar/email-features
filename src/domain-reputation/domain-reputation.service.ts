import { Injectable } from '@nestjs/common';
import * as whois from 'whois';
import * as dns from 'dns';
import * as tls from 'tls';
import * as https from 'https';
import { cidrSubnet } from 'ip';

@Injectable()
export class DomainReputationService {
  // Helper function to calculate domain age
  private calculateDomainAge(creationDate: string): number {
    const creation = new Date(creationDate);
    const current = new Date();
    return (
      (current.getTime() - creation.getTime()) / (1000 * 60 * 60 * 24 * 365)
    ); // Age in years
  }

  // Function to get WHOIS data and score domain age
  private getWhoisData(
    domain: string,
  ): Promise<{ score: number; details: string[]; registrar?: string }> {
    return new Promise((resolve) => {
      whois.lookup(domain, (err, data) => {
        const scoreDetails: string[] = [];
        let score = 0;
        let registrar = '';

        if (err) {
          console.error(`Error fetching WHOIS data for ${domain}:`, err);
          return resolve({ score, details: scoreDetails });
        }

        // Extract domain creation date from WHOIS response
        const creationDateMatch = data.match(/Creation Date:\s*(.*)/i);
        if (creationDateMatch) {
          const creationDate = creationDateMatch[1].trim();
          const domainAge = this.calculateDomainAge(creationDate);

          // Assign score based on domain age
          if (domainAge > 10) {
            score += 15;
            scoreDetails.push(
              `Domain age: ${domainAge.toFixed(2)} years. Score: +15`,
            );
          } else if (domainAge > 5) {
            score += 10;
            scoreDetails.push(
              `Domain age: ${domainAge.toFixed(2)} years. Score: +10`,
            );
          } else if (domainAge > 1) {
            score += 5;
            scoreDetails.push(
              `Domain age: ${domainAge.toFixed(2)} years. Score: +5`,
            );
          } else {
            score -= 5;
            scoreDetails.push(
              `Domain age: ${domainAge.toFixed(2)} years. Score: -5`,
            );
          }
        } else {
          console.log('Creation date not found in WHOIS data.');
        }

        // Extract registrar from WHOIS response
        const registrarMatch = data.match(/Registrar:\s*(.*)/i);
        if (registrarMatch) {
          registrar = registrarMatch[1].trim();
        } else {
          console.log('Registrar not found in WHOIS data.');
        }

        resolve({ score, details: scoreDetails, registrar });
      });
    });
  }

  // Function to check SSL certificate and calculate score
  private checkSSL(
    domain: string,
  ): Promise<{ score: number; details: string[] }> {
    return new Promise((resolve) => {
      const options = {
        host: domain,
        port: 443,
        servername: domain,
      };
      const scoreDetails: string[] = [];
      let score = 0;

      const socket = tls.connect(options, () => {
        const cert = socket.getPeerCertificate();

        if (cert && cert.valid_to) {
          const certExpiry = new Date(cert.valid_to);
          const currentDate = new Date();

          if (certExpiry > currentDate) {
            score += 10; // Valid certificate
            scoreDetails.push(
              `SSL Certificate valid until: ${certExpiry}. Score: +10`,
            );
          } else {
            score -= 10; // Expired certificate
            scoreDetails.push(
              `SSL Certificate expired on: ${certExpiry}. Score: -10`,
            );
          }
        } else {
          score -= 10; // No certificate or invalid data
          scoreDetails.push('No valid SSL certificate found. Score: -10');
        }

        socket.end();
        resolve({ score, details: scoreDetails });
      });

      socket.on('error', (err) => {
        score -= 10; // Error establishing SSL connection
        console.error(`Error checking SSL for ${domain}:`, err);
        scoreDetails.push('Error establishing SSL connection. Score: -10');
        resolve({ score, details: scoreDetails });
      });
    });
  }

  // Function to check if an IP address is within a CIDR range
  private checkIpInCidr(ipAddress: string, cidr: string): boolean {
    const subnet = cidrSubnet(cidr);
    return subnet.contains(ipAddress);
  }

  // Function to check against Spamhaus DROP list using IP addresses
  private checkSpamhausDROP(
    domain: string,
  ): Promise<{ score: number; details: string[] }> {
    return new Promise((resolve) => {
      const scoreDetails: string[] = [];
      let score = 0;

      dns.resolve(domain, 'A', (err, addresses) => {
        if (err) {
          console.error(`Error resolving ${domain}:`, err);
          return resolve({ score, details: scoreDetails });
        }

        const ipAddress = addresses[0]; // Use the first resolved IP address
        console.log(`Resolved IP for ${domain}: ${ipAddress}`);

        https
          .get('https://www.spamhaus.org/drop/drop.txt', (res) => {
            let data = '';

            res.on('data', (chunk) => {
              data += chunk;
            });

            res.on('end', () => {
              const dropList = data
                .split('\n')
                .map((line) => line.trim())
                .filter(
                  (line) => line && !line.startsWith(';') && line.includes('/'),
                );

              // Check if the IP address is in any of the CIDR ranges
              const foundInDROP = dropList.some((range) =>
                this.checkIpInCidr(ipAddress, range.split(' ')[0]),
              );

              if (foundInDROP) {
                score -= 20; // IP found in DROP list
                scoreDetails.push(
                  `IP ${ipAddress} found in Spamhaus DROP list. Score: -20`,
                );
              } else {
                score += 5; // IP not found in DROP list
                scoreDetails.push(
                  `IP ${ipAddress} not found in Spamhaus DROP list. Score: +5`,
                );
              }

              resolve({ score, details: scoreDetails });
            });
          })
          .on('error', (err) => {
            console.error(`Error fetching Spamhaus DROP list:`, err);
            resolve({ score, details: scoreDetails });
          });
      });
    });
  }

  // Function to calculate reputation score
  async calculateScore(
    domain: string,
  ): Promise<{ finalScore: number; details: string[]; registrar?: string }> {
    let score = 0;
    const details: string[] = [];
    let registrar: string | undefined;

    // Basic TLD and domain length checks
    if (domain.includes('.com')) {
      score += 10; // Higher score for popular TLD
      details.push(`Domain has a .com TLD. Score: +10`);
    }
    if (domain.length < 10) {
      score += 5; // Shorter domains get higher score
      details.push(`Domain length is less than 10. Score: +5`);
    }

    // Fetch WHOIS data and calculate domain age
    const whoisResult = await this.getWhoisData(domain);
    score += whoisResult.score;
    details.push(...whoisResult.details);
    registrar = whoisResult.registrar; // Store registrar information

    // Check SSL certificate
    const sslResult = await this.checkSSL(domain);
    score += sslResult.score;
    details.push(...sslResult.details);

    // Check against Spamhaus DROP list
    const spamhausResult = await this.checkSpamhausDROP(domain);
    score += spamhausResult.score;
    details.push(...spamhausResult.details);

    return { finalScore: score, details, registrar }; // Return registrar in results
  }
}
