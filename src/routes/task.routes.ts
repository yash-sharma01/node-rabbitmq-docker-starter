import { Router } from "express";
import {
  createTaskValidate,
  getTasksValidate,
  startTaskValidate,
} from "../validations/task.validation";
import { taskController } from "../controllers";

const router = Router();

router.get("/", getTasksValidate, taskController.getTasks);
router.post("/", createTaskValidate, taskController.createTask);
router.post("/start", startTaskValidate, taskController.startTask);

export default router;
