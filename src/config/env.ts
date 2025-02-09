import "dotenv/config";
import { z } from "zod";

const nonEmptyString = () =>
  z.string().trim().min(1, { message: "Value must not be empty" });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().positive().default(8000),

  CLIENT_URL: nonEmptyString().url(),

  MONGODB_URI: nonEmptyString().url(),
  RABBITMQ_URI: nonEmptyString().url(),

  ACCESS_TOKEN_SECRET: nonEmptyString(),
  REFRESH_TOKEN_SECRET: nonEmptyString(),

  SMTP_PORT: z.coerce.number().positive(),
  SMTP_HOST: nonEmptyString(),
  SMTP_USER: nonEmptyString().email(),
  SMTP_PASS: nonEmptyString(),
  EMAIL_FROM: nonEmptyString().email(),
});

export const env: z.infer<typeof envSchema> = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? "",
  CLIENT_URL: process.env.CLIENT_URL ?? "",
  EMAIL_FROM: process.env.EMAIL_FROM ?? "",
  MONGODB_URI: process.env.MONGODB_URI ?? "",
  NODE_ENV: (process.env.NODE_ENV ?? "development") as any,
  PORT: (process.env.PORT ?? 8000) as any,
  RABBITMQ_URI: process.env.RABBITMQ_URI ?? "",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? "",
  SMTP_HOST: process.env.SMTP_HOST ?? "",
  SMTP_PASS: process.env.SMTP_PASS ?? "",
  SMTP_PORT: (process.env.SMTP_PORT ?? 587) as any,
  SMTP_USER: process.env.SMTP_USER ?? "",
};

export function validateEnv() {
  const parsed = envSchema.safeParse(env);
  if (!parsed.success) {
    console.error(
      "❌ Invalid/missing environment variables:",
      parsed.error.flatten().fieldErrors
    );
    process.exit(1);
  }
  return parsed.data;
}
