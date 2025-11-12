
export type NotificationType = "offer" | "payment" | "completed" | "student" | "admin" | "merchant" | string;

export interface RawNotification {
  _id?: string;
  id?: string;
  title?: string;
  message?: string;
  type?: NotificationType;
  receiverId?: string;
  isRead?: boolean;
  createdAt?: string;
  updatedAt?: string;
  readAt?: string;
  [k: string]: any;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type?: NotificationType;
  receiverId?: string;
  isRead?: boolean;
  createdAt?: string;
  readAt?: string;
  raw?: RawNotification;
}
