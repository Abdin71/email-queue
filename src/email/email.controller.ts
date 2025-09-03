import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async send(@Body() dto: EmailDto) {
    return this.emailService.sendEmail(dto);
  }

  @Get('status/:id')
  async status(@Param('id') id: string) {
    return this.emailService.getJobStatus(id);
  }
}
