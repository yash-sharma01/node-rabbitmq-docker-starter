import { Router } from "express";
import { authController } from "../controllers";
import {
  changePasswordValidate,
  completePasswordResetValidate,
  getCurrentUserValidate,
  initiatePasswordResetValidate,
  loginValidate,
  registerValidate,
  verifyEmailValidate,
} from "../validations/auth.validation";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", registerValidate, authController.register);
router.post("/login", loginValidate, authController.login);
router.post("/verify-email", verifyEmailValidate, authController.verifyEmail);
router.post("/resend-verification", authController.resendVerificationEmail);

router.post(
  "/password/forgot",
  initiatePasswordResetValidate,
  authController.initiatePasswordReset
);
router.post(
  "/password/reset",
  completePasswordResetValidate,
  authController.completePasswordReset
);
router.post(
  "/password/change",
  authMiddleware,
  changePasswordValidate,
  authController.changePassword
);

router.get(
  "/me",
  authMiddleware,
  getCurrentUserValidate,
  authController.getCurrentUser
);

export default router;
