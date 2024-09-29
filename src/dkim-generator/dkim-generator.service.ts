import { Injectable } from '@nestjs/common';
import { generateKeyPairSync } from 'crypto';

@Injectable()
export class DkimGeneratorService {
  // Function to generate DKIM DNS TXT record using the public key
  generateDKIM(selector: string, domain: string, publicKey: string): string {
    return `${selector}._domainkey.${domain} IN TXT "v=DKIM1; k=rsa; p=${publicKey}"`;
  }

  // Function to generate RSA key pair based on the chosen key length
  generateRSAKeyPair(keyLength: number) {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: keyLength,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    // Clean up the public key by removing header/footer and newlines
    const cleanedPublicKey = publicKey
      .replace(/-----BEGIN PUBLIC KEY-----\n/, '')
      .replace(/-----END PUBLIC KEY-----\n/, '')
      .replace(/\n/g, ''); // Remove all newline characters

    return { publicKey: cleanedPublicKey, privateKey };
  }
}
