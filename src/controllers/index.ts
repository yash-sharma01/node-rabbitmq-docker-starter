import { taskService } from "../services";
import { TaskController } from "./task-controller";

export const taskController = new TaskController(taskService);
