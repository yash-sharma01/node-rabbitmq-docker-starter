import { Router } from "express";
import { authController } from "../controllers";
import {
  forgotPasswordValidate,
  loginValidate,
  registerValidate,
  resetPasswordValidate,
  verifyEmailValidate,
} from "../validations/auth.validation";

const router = Router();

router.post("/register", registerValidate, authController.register);
router.post("/login", loginValidate, authController.login);
router.post(
  "/forgot-password",
  forgotPasswordValidate,
  authController.forgotPassword
);
router.post(
  "/reset-password",
  resetPasswordValidate,
  authController.resetPassword
);
router.post("/verify-email", verifyEmailValidate, authController.verifyEmail);
router.post("/resend-verification", authController.resendVerificationEmail);

export default router;
