import { env } from "../config/env";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth-service";
import { EmailService } from "../services/email-service";
import {
  ChangePasswordHandler,
  CompletePasswordResetHandler,
  GetCurrentUserHandler,
  InitiatePasswordResetHandler,
  LoginHandler,
  RegisterHandler,
  ResendVerificationEmailHandler,
  VerifyEmailHandler,
} from "../validations/auth.validation";
import { BaseController } from "./base-controller";

export class AuthController extends BaseController {
  private readonly emailService: EmailService;
  private readonly authService: AuthService;

  constructor(emailService: EmailService, authService: AuthService) {
    super();
    this.emailService = emailService;
    this.authService = authService;
  }

  public register: RegisterHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return this.badRequestResponse(res, "User already exists");

      const newUser = new User({ email, password });
      await newUser.save();

      // Send verification email
      const verificationToken = this.authService.generateAccessToken(newUser);
      const verificationLink = `${env.CLIENT_URL}/verify-email?token=${verificationToken}&email=${email}`;

      await this.emailService.sendEmail(
        email,
        "Verify Your Email",
        `<a href="${verificationLink}">Verify Email</a>`
      );

      return this.createdResponse(
        res,
        "User registered successfully. Check your email for verification link."
      );
    } catch (error) {
      return next(error);
    }
  };

  public login: LoginHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return this.badRequestResponse(res, "Invalid email or password");

      if (user.lockedUntil && user.lockedUntil > new Date()) {
        return this.unauthenticatedResponse(
          res,
          "Account is temporarily locked. Please try again later."
        );
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        user.failedAttempts += 1;

        if (user.failedAttempts >= 5) {
          user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // Lock for 30 minutes
          await user.save();
          return this.unauthenticatedResponse(
            res,
            "Account locked due to too many failed login attempts."
          );
        }

        await user.save();
        return this.badRequestResponse(res, "Invalid email or password");
      }

      if (!user.isVerified)
        return this.badRequestResponse(res, "Account not verified");

      user.failedAttempts = 0;
      user.lockedUntil = null;
      await user.save();

      const accessToken = this.authService.generateAccessToken(user);
      const refreshToken = this.authService.generateRefreshToken(user);

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      return this.successResponse(res, "Login successful", { accessToken });
    } catch (error) {
      return next(error);
    }
  };

  public initiatePasswordReset: InitiatePasswordResetHandler = async (
    req,
    res,
    next
  ) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return this.badRequestResponse(res, "User not found");

      const resetToken = this.authService.generateAccessToken(user);

      const resetLink = `${env.CLIENT_URL}/reset-password?token=${resetToken}`;

      await this.emailService.sendEmail(
        email,
        "Reset Your Password",
        `<a href="${resetLink}">Click here to reset your password</a>`
      );

      return this.successResponse(
        res,
        "Password reset link sent to your email."
      );
    } catch (error) {
      next(error);
    }
  };

  public completePasswordReset: CompletePasswordResetHandler = async (
    req,
    res,
    next
  ) => {
    const { token, newPassword } = req.body;
    try {
      const decoded = this.authService.verifyAccessToken(token);
      if (decoded.error) return this.badRequestResponse(res, decoded.message);

      const user = await User.findById(decoded.id);
      if (!user)
        return this.badRequestResponse(res, "Invalid or expired token");

      user.password = newPassword;
      await user.save();

      return this.successResponse(res, "Password reset successful");
    } catch (error) {
      next(error);
    }
  };

  public changePassword: ChangePasswordHandler = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    try {
      const user = await User.findById(req.user?.id);
      if (!user) return this.badRequestResponse(res, "User not found");

      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch)
        return this.badRequestResponse(res, "Old password is incorrect");

      user.password = newPassword;
      await user.save();

      return this.successResponse(res, "Password changed successfully");
    } catch (error) {
      next(error);
    }
  };

  public verifyEmail: VerifyEmailHandler = async (req, res, next) => {
    const { token } = req.body;
    try {
      const decoded = this.authService.verifyAccessToken(token);
      if (decoded.error) return this.badRequestResponse(res, decoded.message);

      const user = await User.findById(decoded.id);
      if (!user)
        return this.badRequestResponse(res, "Invalid or expired token");

      if (user.isVerified)
        return this.badRequestResponse(res, "Email is already verified");

      user.isVerified = true;
      await user.save();

      return this.successResponse(res, "Email verified successfully");
    } catch (error) {
      console.log({ error });
      return next(error);
    }
  };

  public resendVerificationEmail: ResendVerificationEmailHandler = async (
    req,
    res,
    next
  ) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return this.badRequestResponse(res, "User not found");

      if (user.isVerified)
        return this.badRequestResponse(res, "Email is already verified");

      const verificationToken = this.authService.generateAccessToken(user);
      const verificationLink = `${env.CLIENT_URL}/verify-email?token=${verificationToken}&email=${email}`;

      await this.emailService.sendEmail(
        email,
        "Resend Verification Email",
        `<a href="${verificationLink}">Verify Email</a>`
      );

      return this.successResponse(
        res,
        "Verification email resent successfully."
      );
    } catch (error) {
      return next(error);
    }
  };

  public getCurrentUser: GetCurrentUserHandler = async (req, res, next) => {
    try {
      const user = await User.findById(req.user?.id);
      if (!user) return this.badRequestResponse(res, "User not found");

      return this.successResponse(res, "Current user fetched successfully", {
        email: user.email,
        isVerified: user.isVerified,
        roles: user.roles,
        _id: user._id,
      });
    } catch (error) {
      return next(error);
    }
  };
}
