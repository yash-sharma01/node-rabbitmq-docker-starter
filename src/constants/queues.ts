export enum QueueEnum {
  SEND_EMAIL = "SEND_EMAIL",
  SEND_SMS_NOTIFICATION = "SEND_SMS_NOTIFICATION",
}
export type QueueType = keyof typeof QueueEnum;
