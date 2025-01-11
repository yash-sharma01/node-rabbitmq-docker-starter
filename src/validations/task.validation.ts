import { z } from "zod";
import { validateRequest } from "../middlewares/validation.middleware";

export const getTasksValidate = validateRequest({});
export type GetTasksHandler = typeof getTasksValidate;

export const createTaskValidate = validateRequest({
  body: z.object({
    taskName: z.string().min(4, "Task name must be at least 4 characters"),
  }),
});
export type CreateTaskHandler = typeof createTaskValidate;

export const startTaskValidate = validateRequest({
  body: z.object({
    taskId: z.string(),
  }),
});
export type StartTaskHandler = typeof startTaskValidate;
