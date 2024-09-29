// src/spf-generator/spf-generator.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpfGeneratorService {
  // Function to generate the SPF record
  generateSPF(
    domain: string,
    ip4Addresses: string[],
    ip6Addresses: string[],
    includeDomains: string[],
    mxIncluded: boolean,
  ): string {
    let spfRecord = `v=spf1`;

    // Add IPv4 addresses
    if (ip4Addresses.length > 0) {
      ip4Addresses.forEach((ip) => {
        spfRecord += ` ip4:${ip}`;
      });
    }

    // Add IPv6 addresses
    if (ip6Addresses.length > 0) {
      ip6Addresses.forEach((ip) => {
        spfRecord += ` ip6:${ip}`;
      });
    }

    // Include other domains
    if (includeDomains.length > 0) {
      includeDomains.forEach((domain) => {
        spfRecord += ` include:${domain}`;
      });
    }

    // Add MX records if included
    if (mxIncluded) {
      spfRecord += ` mx`;
    }

    // End with 'all'
    spfRecord += ` ~all`;

    return spfRecord;
  }
}
