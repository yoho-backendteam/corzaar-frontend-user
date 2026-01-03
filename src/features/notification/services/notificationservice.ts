import Client from "../../../api/index"; 
import type { CreateNotificationPayload, UpdateNotificationPayload } from "../../../features/notification/notificationtype";

// Fetch all notifications
export const getAllNotificationsService = async () => {
  const response = await Client.notifications.getAll();
  return response.data;
};

// Fetch notifications by type
export const getNotificationsByTypeService = async (type: string) => {
  const response = await Client.notifications.getByType(type);
  return response.data;
};

// Fetch notification by ID
export const getNotificationByIdService = async (id: string) => {
  const response = await Client.notifications.getById(id);
  return response.data;
};

// Create notification
export const createNotificationService = async (data: CreateNotificationPayload) => {
  const response = await Client.notifications.create(data);
  return response.data;
};

// Update notification
export const updateNotificationService = async (id: string, data: UpdateNotificationPayload) => {
  const response = await Client.notifications.update(id, data);
  return response.data;
};

// Mark as read
export const markNotificationAsReadService = async (id: string) => {
  const response = await Client.notifications.markAsRead(id);
  return response.data;
};

// Delete notification
export const deleteNotificationService = async (id: string) => {
  const response = await Client.notifications.delete(id);
  return response.data;
};

// Web show
export const webShowNotificationService = async (data: any) => {
  const response = await Client.notifications.webShow(data);
  return response.data;
};
