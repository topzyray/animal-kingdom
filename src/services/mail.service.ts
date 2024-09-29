import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      //   host: this.configService.get<string>('emailAuth.host'),
      //   port: 587,
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('emailAuth.user'),
        pass: this.configService.get<string>('emailAuth.pass'),
      },
    });
  }

  async sendPasswordResetEmail(
    recipientEmail: string,
    token: string,
    firstName: string,
  ) {
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const mailOptions = {
      //   from: '"Animal Kingdom" <maddison53@ethereal.email>',
      from: `'Animal Kingdom' <${this.configService.get<string>('emailAuth.user')}>`,
      to: recipientEmail,
      subject: 'Password Reset Link',
      html: `<section>
        <p>Dear ${firstName}, </p>
        <p>You requested for a password reset. Click the reset link below to reset your password: </p>
        <a href="${resetLink}" style="display: block; cursor: pointer;"><button style="padding: 0.5rem 0.8rem; border-radius: 5px; cursor: pointer;">Reset Password</button></a>
        <p><em>If this is not you, please ignore this email.</em></p>
        <p>Thank you</p>
        <p>Animal Kingdom & Co.</p>
      </section>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
