import { Router } from "express";
import { taskController } from "../controllers";
import { rateLimitConfig } from "../config/rate-limit";

const router = Router();

router.use("/tasks", rateLimitConfig.api, taskController.router);

export default router;
