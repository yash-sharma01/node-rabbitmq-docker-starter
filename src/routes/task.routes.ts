import { Router } from "express";
import { rateLimitConfig } from "../config/rate-limit";
import { TaskController } from "../controllers/task-controller";
import { validate } from "../middlewares/validate";
import {
  createTaskSchema,
  startTaskSchema,
} from "../validations/task.validation";

const router = Router();

const taskController = new TaskController();

router.post(
  "/",
  rateLimitConfig.api,
  validate(createTaskSchema),
  taskController.createTask
);

router.get(
  "/",
  rateLimitConfig.api,
  // validate(createTaskSchema),
  taskController.getTasks
);

router.post(
  "/start",
  rateLimitConfig.api,
  validate(startTaskSchema),
  taskController.startTask
);

export default router;
