import { authService, emailService, taskService } from "../services";
import { AuthController } from "./auth-controller";
import { TaskController } from "./task-controller";

export const taskController = new TaskController(taskService);
export const authController = new AuthController(emailService, authService);
