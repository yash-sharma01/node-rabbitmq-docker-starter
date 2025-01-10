import amqplib, { Channel, Connection } from "amqplib";

export default abstract class BaseConsumer {
  private connection!: Connection;
  public channel!: Channel;

  public async connect() {
    this.connection = await amqplib.connect(process.env.RABBITMQ_URI!);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.getQueueName(), { durable: true });
  }

  public async consume() {
    await this.channel.consume(
      this.getQueueName(),
      this.processJob.bind(this),
      { noAck: false }
    );
    console.log(`Waiting for messages in ${this.getQueueName()}`);
  }

  protected abstract getQueueName(): string;

  protected abstract processJob(
    msg: amqplib.ConsumeMessage | null
  ): Promise<void>;

  protected acknowledge(msg: amqplib.ConsumeMessage) {
    this.channel.ack(msg);
  }
}
