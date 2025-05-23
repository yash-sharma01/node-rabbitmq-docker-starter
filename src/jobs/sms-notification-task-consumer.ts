import amqplib from "amqplib";
import BaseConsumer from "./base-consumer";
import { QueueEnum } from "../constants/queues";

class SMSNotificationTaskConsumer extends BaseConsumer {
  protected getQueueName(): string {
    return QueueEnum.SEND_SMS_NOTIFICATION;
  }

  protected async processJob(
    msg: amqplib.ConsumeMessage | null
  ): Promise<void> {
    if (msg) {
      try {
        const taskData = JSON.parse(msg.content.toString());
        console.log("Processing sms task:", taskData);
        this.acknowledge(msg);
      } catch (err) {
        console.error("Error processing sms task:", err);
      }
    }
  }
}

export default new SMSNotificationTaskConsumer();
