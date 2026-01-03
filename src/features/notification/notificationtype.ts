export interface Notification {
  id: string;        
  title: string;
  message: string;
  type: string;
  isRead: boolean;   
  createdAt: string;
}

export interface CreateNotificationPayload {
  title: string;
  message: string;               
  type: string;
}
export interface UpdateNotificationPayload {
  title?: string;
  message?: string;
  type?: string;
  isRead?: boolean;
}
