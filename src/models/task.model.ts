import { Schema, model, Document } from "mongoose";

interface Task extends Document {
  taskName: string;
  status: string;
  createdAt: Date;
}

const taskSchema = new Schema<Task>({
  taskName: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const TaskModel = model<Task>("Task", taskSchema);

export default TaskModel;
