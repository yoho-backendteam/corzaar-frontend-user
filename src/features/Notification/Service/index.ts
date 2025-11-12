// src/services/notification/index.ts
import httpclient from "../../../api/httpclients";
import { API_END_POINTS } from "../../../api/endpoints";
import type { RawNotification } from "../../../features/Notification/Types/Index";

export const getAllNotifications = async (params?: any) => {
  const res = await httpclient.get(API_END_POINTS.notification.get, params);
  return res.data as { success: boolean; data: RawNotification[] } | any;
};

export const getNotificationsByType = async (type?: string, extraParams?: any) => {
  const res = await httpclient.get(API_END_POINTS.notification.getByType, { params: { type, ...extraParams } });
  return res.data;
};

// export const markNotificationAsReadAPI = async (id: string) => {
//   const url = API_END_POINTS.notification.patch.replace(":id", id);
//   const res = await httpclient.patch(url, {});
//   return res.data;
// };

export const markNotificationAsReadAPI = async (id: string) => {
  console.log("🔄 markNotificationAsReadAPI CALLED - ID:", id);
  
  const url = API_END_POINTS.notification.patch.replace(":id", id);
  console.log("🔗 API URL:", url);
  
  const res = await httpclient.patch(url, {});
  console.log("✅ markNotificationAsReadAPI SUCCESS - Response:", res.data);
  
  return res.data;
};

export const deleteNotificationAPI = async (id: string) => {
  const url = API_END_POINTS.notification.delete.replace(":id", id);
  const res = await httpclient.delete(url);
  return res.data;
};

// NEW: Create notification
export const createNotificationAPI = async (data: Partial<RawNotification>) => {
  const res = await httpclient.post(API_END_POINTS.notification.post, data);
  return res.data;
};

// NEW: Get notification by ID
export const getNotificationByIdAPI = async (id: string) => {
  const url = API_END_POINTS.notification.getById.replace(":id", id);
  const res = await httpclient.get(url);
  return res.data;
};

// NEW: Update notification
export const updateNotificationAPI = async (id: string, data: Partial<RawNotification>) => {
  const url = API_END_POINTS.notification.put.replace(":id", id);
  const res = await httpclient.put(url, data);
  return res.data;
};

// NEW: Webshow
export const webshowAPI = async (data: any) => {
  const res = await httpclient.post(API_END_POINTS.notification.webshow, data);
  return res.data;
};

export default {
  getAllNotifications,
  getNotificationsByType,
  markNotificationAsReadAPI,
  deleteNotificationAPI,
  createNotificationAPI,
  getNotificationByIdAPI,
  updateNotificationAPI,
  webshowAPI,
};
