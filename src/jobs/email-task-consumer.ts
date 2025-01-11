import amqplib from "amqplib";
import { QueueEnum } from "../constants/queues";
import { TaskService } from "../services/task-service";
import BaseConsumer from "./base-consumer";

class EmailTaskConsumer extends BaseConsumer {
  private readonly taskService: TaskService;

  constructor() {
    super();
    this.taskService = new TaskService();
  }

  protected getQueueName(): string {
    return QueueEnum.SEND_EMAIL;
  }

  protected async processJob(
    msg: amqplib.ConsumeMessage | null
  ): Promise<void> {
    if (msg) {
      try {
        const taskData = JSON.parse(msg.content.toString());
        console.log("Processing email task:", taskData); // { taskName: 'Task 1', id: 1 }

        // Sleep for 10 seconds
        await new Promise((resolve) => setTimeout(resolve, 10000));

        this.taskService.updateTaskById(taskData.id, "completed");

        console.log("Email task completed:", taskData.id);

        this.acknowledge(msg);
      } catch (err) {
        console.error("Error processing email task:", err);
      }
    }
  }
}

export default new EmailTaskConsumer();
