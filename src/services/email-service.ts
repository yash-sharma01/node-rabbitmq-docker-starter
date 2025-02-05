import nodemailer from "nodemailer";
import { BaseService } from "./base-service";

export class EmailService extends BaseService {
  private static readonly transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  public async sendEmail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    const from = process.env.EMAIL_FROM ?? "no-reply@example.com";

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
