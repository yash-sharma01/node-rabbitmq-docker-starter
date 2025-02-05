import { Router } from "express";
import { rateLimitConfig } from "../config/rate-limit";
import taskRoutes from "./task.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", rateLimitConfig.api, authRoutes);
router.use("/tasks", rateLimitConfig.api, taskRoutes);

export default router;
