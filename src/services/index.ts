import { AuthService } from "./auth-service";
import { EmailService } from "./email-service";
import { TaskService } from "./task-service";

export const taskService = new TaskService();

export const emailService = new EmailService();

export const authService = new AuthService();
