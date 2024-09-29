import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as Imap from 'imap-simple';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

@Injectable()
export class EmailDeliverabilityService {
  async sendEmailAndCheck(): Promise<string> {
    const senderEmail = process.env.SENDER_EMAIL;
    const senderAppPassword = process.env.SENDER_APP_PASSWORD;
    const receiverEmail = process.env.RECEIVER_EMAIL;
    const receiverAppPassword = process.env.RECEIVER_APP_PASSWORD;

    // Send email function
    const sendEmail = async () => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: senderEmail,
          pass: senderAppPassword,
        },
      });

      const mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: 'Test Email - Check Inbox or Spam',
        text: 'This is a test email to check if it goes to the Inbox or Spam.',
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info.response;
      } catch (error) {
        console.error('Error while sending email:', error);
        throw new Error('Failed to send email');
      }
    };

    // Check if email landed in Inbox or Spam
    const checkEmail = async () => {
      const imapConfig = {
        imap: {
          user: receiverEmail,
          password: receiverAppPassword,
          host: 'imap.gmail.com',
          port: 993,
          tls: true,
          authTimeout: 3000,
          tlsOptions: {
            rejectUnauthorized: false,
          },
        },
      };

      try {
        const connection = await Imap.connect(imapConfig);
        await connection.openBox('INBOX');

        const searchCriteria = [
          'ALL',
          ['SUBJECT', 'Test Email - Check Inbox or Spam'],
        ];
        const fetchOptions = {
          bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
        };

        const results = await connection.search(searchCriteria, fetchOptions);
        if (results.length > 0) {
          return 'Email found in Inbox!';
        } else {
          await connection.openBox('[Gmail]/Spam');
          const spamResults = await connection.search(
            searchCriteria,
            fetchOptions,
          );

          if (spamResults.length > 0) {
            return 'Email found in Spam.';
          } else {
            return 'Email not found in Inbox or Spam.';
          }
        }
      } catch (err) {
        console.log('IMAP connection error:', err);
        throw new Error('IMAP connection error');
      }
    };

    await sendEmail();
    return await checkEmail();
  }
}
