import rabbitmqHandler from "../jobs/rabbitmqHandler";
import { TaskService } from "../services/task-service";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

export class TaskController {
  private readonly taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  public getTasks = asyncHandler(async (req, res) => {
    const tasks = await this.taskService.getAllTasks();
    return ApiResponse.success(res, "Fetched Tasks successfully", tasks, 200);
  });

  public createTask = asyncHandler(async (req, res) => {
    if (!req.body?.taskName)
      return ApiResponse.error(res, "Task name is required", 400);

    let task = null;
    try {
      task = await this.taskService.createTask(req.body.taskName);
    } catch (error) {
      if (error instanceof ApiError) {
        return ApiResponse.error(
          res,
          "Failed to create task",
          error.statusCode
        );
      }
    }
    return ApiResponse.success(res, "Task created successfully", task, 204);
  });

  public startTask = asyncHandler(async (req, res) => {
    if (!req.body?.taskId)
      return ApiResponse.error(res, "Task id is required", 400);

    try {
      const updatedTask = await this.taskService.updateTaskById(
        req.body.taskId,
        "started"
      );

      rabbitmqHandler.sendToQueue("emailTaskQueue", { id: updatedTask?.id });
    } catch (error) {
      if (error instanceof ApiError) {
        return ApiResponse.error(res, "Failed to start task", error.statusCode);
      }
    }

    return ApiResponse.success(res, "Logout successful", null, 204);
  });
}
