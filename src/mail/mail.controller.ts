import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDto } from 'src/dto/mail.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OtpAgentDto } from 'src/dto/otpagent';

//@UseGuards(JwtAuthGuard)
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

}
