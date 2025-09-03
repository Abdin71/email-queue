import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { EmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async sendEmail(emailDto: EmailDto) {
    const job = await this.emailQueue.add('send', emailDto, {
      attempts: 1,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: true,
      priority: 2,
    });
    return { jobId: job.id, status: 'queued' };
  }

  async getJobStatus(jobId: string) {
    const job = await this.emailQueue.getJob(jobId);
    if (!job) return { status: 'not_found' };
    return { 
      id: job.id, 
      status: await job.getState(), 
      progress: await job.progress() 
    };
  }
}
