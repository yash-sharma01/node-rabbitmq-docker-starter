import TaskModel from "../models/task.model";
import { NotFoundError } from "../utils/error";
import { BaseService } from "./base-service";

export class TaskService extends BaseService {
  public async getAllTasks() {
    return TaskModel.find();
  }

  public async getTaskById(id: string) {
    const task = await TaskModel.findById(id);
    if (!task) throw new NotFoundError(`Task with id: ${id} not found`);
    return task;
  }

  public async updateTaskById(id: string, status: string) {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { status });
    if (!updatedTask) throw new NotFoundError(`Task with id: ${id} not found`);
    return updatedTask;
  }

  public async createTask(taskName: string) {
    if (!taskName) throw new NotFoundError("Task name is required");

    const task = new TaskModel({ taskName });
    await task.save();
    return task;
  }
}
