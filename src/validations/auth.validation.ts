import { z } from "zod";
import { validateRequest } from "../middlewares/validation.middleware";

export const registerValidate = validateRequest({
  body: z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});
export type RegisterHandler = typeof registerValidate;

export const loginValidate = validateRequest({
  body: z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});
export type LoginHandler = typeof loginValidate;

export const initiatePasswordResetValidate = validateRequest({
  body: z.object({
    email: z.string().email("Enter a valid email"),
  }),
});
export type InitiatePasswordResetHandler = typeof initiatePasswordResetValidate;

export const completePasswordResetValidate = validateRequest({
  body: z.object({
    token: z.string().min(1),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
  }),
});
export type CompletePasswordResetHandler = typeof completePasswordResetValidate;

export const changePasswordValidate = validateRequest({
  body: z.object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
  }),
});
export type ChangePasswordHandler = typeof changePasswordValidate;

export const verifyEmailValidate = validateRequest({
  body: z.object({
    token: z.string().min(1),
  }),
});
export type VerifyEmailHandler = typeof verifyEmailValidate;

export const resendVerificationEmailValidate = validateRequest({
  body: z.object({
    email: z.string().email("Enter a valid email"),
  }),
});
export type ResendVerificationEmailHandler =
  typeof resendVerificationEmailValidate;
