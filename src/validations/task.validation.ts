import { z } from "zod";

export const createTaskSchema = z.object({
  taskName: z.string().min(4, "Task name must be at least 4 characters"),
});

export const startTaskSchema = z.object({
  taskId: z.string(),
});
