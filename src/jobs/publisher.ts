import { QueueType } from "../constants/queues";
import EmailTaskConsumer from "./email-task-consumer";
import SMSNotificationTaskConsumer from "./sms-notification-task-consumer";

class Publisher {
  private readonly consumerRegistry: Record<QueueType, any>;

  constructor() {
    this.consumerRegistry = {
      SEND_EMAIL: EmailTaskConsumer,
      SEND_SMS_NOTIFICATION: SMSNotificationTaskConsumer,
    };
  }

  public async initialize() {
    await EmailTaskConsumer.connect();
    await SMSNotificationTaskConsumer.connect();
  }

  public startConsuming() {
    EmailTaskConsumer.consume();
    SMSNotificationTaskConsumer.consume();
  }

  public sendToQueue(queueName: QueueType, taskData: any) {
    const consumer = this.consumerRegistry[queueName];

    if (consumer?.channel) {
      consumer.channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(taskData)),
        { persistent: true }
      );
      console.log(`Task sent to queue: ${queueName}`);
    } else {
      console.error(`No consumer found for queue: ${queueName}`);
    }
  }
}

export default new Publisher();
