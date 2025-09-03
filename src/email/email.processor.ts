import { Processor, Process, OnQueueFailed } from '@nestjs/bull';
import type { Job } from 'bull';
import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Processor('email')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);
  private transporter;

  constructor() {
    this.setupTransporter();
  }

  private async setupTransporter() {
    if (process.env.NODE_ENV === 'production') {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    } else {
      // Create a fake test account with Ethereal Mail
      const testAccount = await nodemailer.createTestAccount();
      this.logger.debug(`Ethereal Test Account:`);
      this.logger.debug(`User: ${testAccount.user}`);
      this.logger.debug(`Pass: ${testAccount.pass}`);
      this.logger.debug(`URL: ${nodemailer.getTestMessageUrl(testAccount)}`);

      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // Ethereal uses a STARTTLS connection, not SSL/TLS
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }
  }

  @Process('send')
  async handleSend(job: Job<any>) {
    this.logger.debug(`Processing email job ${job.id}`);
    await job.progress(10);

    const mailOptions = {
      from: 'noreply@example.com', // Ethereal doesn't require a real 'from' address
      to: job.data.to,
      subject: job.data.subject,
      text: job.data.text,
      html: job.data.html,
      attachments: job.data.attachments,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      await job.progress(100);
      this.logger.debug(`Email sent job ${job.id}: ${info.messageId}`);
      this.logger.debug(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      return info;
    } catch (error) {
      this.logger.error(`Failed to send email for job ${job.id}: ${error.message}`);
      throw error;
    }
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    this.logger.error(`Job ${job?.id} failed: ${err?.message}`);
  }
}