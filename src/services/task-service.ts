import TaskModel from "../models/task.model";
import { ApiError } from "../utils/api-error";

export class TaskService {
  public async getAllTasks() {
    return TaskModel.find();
  }

  public async getTaskById(id: string) {
    return TaskModel.findById(id);
  }

  public async updateTaskById(id: string, status: string) {
    return await TaskModel.findByIdAndUpdate(id, { status });
  }

  public async createTask(taskName: string) {
    if (!taskName) throw new ApiError(400, "Task name is required");

    try {
      const task = new TaskModel({ taskName });
      await task.save();
      return task;
    } catch (error) {
      console.error("createTask Failed");
      throw new ApiError(500, "createTask Failed");
    }
  }
}
