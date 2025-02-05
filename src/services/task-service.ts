import { Task } from "../models/task.model";
import { BadRequestError, NotFoundError } from "../utils/error";
import { BaseService } from "./base-service";

export class TaskService extends BaseService {
  public async getAllTasks() {
    return Task.find();
  }

  public async getTaskById(id: string) {
    const task = await Task.findById(id);
    if (!task) throw new NotFoundError(`Task with id: ${id} not found`);
    return task;
  }

  public async updateTaskById(id: string, status: string) {
    const updatedTask = await Task.findByIdAndUpdate(id, { status });
    if (!updatedTask) throw new NotFoundError(`Task with id: ${id} not found`);
    return updatedTask;
  }

  public async createTask(taskName: string) {
    if (!taskName) throw new BadRequestError("Task name is required");

    const task = new Task({ taskName });
    await task.save();
    return task;
  }
}
