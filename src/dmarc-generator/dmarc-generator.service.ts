import { Injectable } from '@nestjs/common';

@Injectable()
export class DmarcService {
  // Function to generate DMARC record
  generateDMARC(
    domain: string,
    policy: string,
    rua?: string,
    ruf?: string,
    subdomainPolicy?: string,
    dkimAlignment?: string,
    spfAlignment?: string,
  ): string {
    let dmarcRecord = `v=DMARC1; p=${policy}`;

    // Aggregate report URI
    if (rua) {
      dmarcRecord += `; rua=mailto:${rua}`;
    }

    // Forensic report URI
    if (ruf) {
      dmarcRecord += `; ruf=mailto:${ruf}`;
    }

    // Subdomain policy
    if (subdomainPolicy) {
      dmarcRecord += `; sp=${subdomainPolicy}`;
    }

    // DKIM alignment
    if (dkimAlignment) {
      dmarcRecord += `; adkim=${dkimAlignment}`;
    }

    // SPF alignment
    if (spfAlignment) {
      dmarcRecord += `; aspf=${spfAlignment}`;
    }

    return dmarcRecord;
  }
}
