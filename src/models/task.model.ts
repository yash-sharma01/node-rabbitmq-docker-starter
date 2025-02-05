import { Schema, model, Document } from "mongoose";

interface ITask extends Document {
  taskName: string;
  status: string;
  createdAt: Date;
}

const taskSchema = new Schema<ITask>({
  taskName: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export const Task = model<ITask>("Task", taskSchema);
