import nodemailer from "nodemailer";
import { BaseService } from "./base-service";
import { env } from "../config/env";

export class EmailService extends BaseService {
  private static readonly transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  public async sendEmail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    const from = env.MAIL_FROM;

    try {
      await EmailService.transporter.sendMail({
        from,
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}
