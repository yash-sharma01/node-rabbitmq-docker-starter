import { QueueEnum } from "../constants/queues";
import publisher from "../jobs/publisher";
import { TaskService } from "../services/task-service";
import {
  CreateTaskHandler,
  GetTasksHandler,
  StartTaskHandler,
} from "../validations/task.validation";
import { BaseController } from "./base-controller";

export class TaskController extends BaseController {
  private readonly taskService: TaskService;

  constructor(taskService: TaskService) {
    super();
    this.taskService = taskService;
  }

  public getTasks: GetTasksHandler = async (req, res, next) => {
    try {
      const tasks = await this.taskService.getAllTasks();
      return this.successResponse(res, "Fetched Tasks successfully", tasks);
    } catch (error) {
      return next(error);
    }
  };

  public createTask: CreateTaskHandler = async (req, res, next) => {
    try {
      const { taskName } = req.body;
      let task = await this.taskService.createTask(taskName);
      return this.createdResponse(res, "Task created successfully", task);
    } catch (error) {
      return next(error);
    }
  };

  public startTask: StartTaskHandler = async (req, res, next) => {
    try {
      const updatedTask = await this.taskService.updateTaskById(
        req.body.taskId,
        "started"
      );
      publisher.sendToQueue(QueueEnum.SEND_EMAIL, { id: updatedTask?.id });
      return this.successResponse(res, "Task started successfully");
    } catch (error) {
      return next(error);
    }
  };
}
