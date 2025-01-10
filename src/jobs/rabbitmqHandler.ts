import EmailTaskConsumer from "./emailTaskConsumer";
import SMSNotificationTaskConsumer from "./smsNotificationTaskConsumer";

class RabbitMQHandler {
  private readonly consumerRegistry: Record<string, any>;

  constructor() {
    this.consumerRegistry = {
      emailTaskQueue: EmailTaskConsumer,
      smsNotificationQueue: SMSNotificationTaskConsumer,
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

  public sendToQueue(queueName: string, taskData: any) {
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

export default new RabbitMQHandler();
