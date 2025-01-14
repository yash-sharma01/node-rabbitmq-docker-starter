import { NextFunction, Request, Response } from "express";
import { QueueEnum } from "../constants/queues";
import publisher from "../jobs/publisher";
import { TaskService } from "../services/task-service";
import {
  createTaskValidate,
  getTasksValidate,
  startTaskValidate,
} from "../validations/task.validation";
import { BaseController } from "./base-controller";

export class TaskController extends BaseController {
  private readonly taskService: TaskService;

  constructor(taskService: TaskService) {
    super();
    this.taskService = taskService;
  }

  protected initializeRoutes() {
    this.router.get("/", getTasksValidate, this.getTasks);
    this.router.post("/", createTaskValidate, this.createTask);
    this.router.post("/start", startTaskValidate, this.startTask);
  }

  // TODO: Use this approach => protected getTasks: GetTasksHandler = async (req, res, next) => {
  protected async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await this.taskService.getAllTasks();
      return this.successResponse(res, "Fetched Tasks successfully", tasks);
    } catch (error) {
      return next(error);
    }
  }

  protected async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskName } = req.body;
      let task = await this.taskService.createTask(taskName);
      return this.createdResponse(res, "Task created successfully", task);
    } catch (error) {
      return next(error);
    }
  }

  protected async startTask(req: Request, res: Response, next: NextFunction) {
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
  }
}
