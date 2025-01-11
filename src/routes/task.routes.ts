import { Router } from "express";
import { rateLimitConfig } from "../config/rate-limit";
import { taskController } from "../controllers";
import {
  createTaskValidate,
  startTaskValidate,
} from "../validations/task.validation";

const router = Router();

router.post(
  "/",
  rateLimitConfig.api,
  createTaskValidate,
  taskController.createTask
);

router.get("/", rateLimitConfig.api, taskController.getTasks);

router.post(
  "/start",
  rateLimitConfig.api,
  startTaskValidate,
  taskController.startTask
);

export default router;
