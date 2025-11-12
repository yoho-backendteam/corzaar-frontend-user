import httpclient from "../api/httpclients";
import { API_END_POINTS } from "./endpoints";

class Client {
  notification = {
    getAllNotifications: (params?: any) => 
      httpclient.get(API_END_POINTS.notification.get, params),

    getNotificationsByType: (params?: any) => 
      httpclient.get(API_END_POINTS.notification.getByType, params),

    createNotification: (data: any) => 
      httpclient.post(API_END_POINTS.notification.post, data),

    getNotificationById: (id: string) => 
      httpclient.get(API_END_POINTS.notification.getById.replace(':id', id)),

    updateNotification: (id: string, data: any) => 
      httpclient.put(API_END_POINTS.notification.put.replace(':id', id), data),

    markNotificationAsRead: (id: string) => 
      httpclient.patch(API_END_POINTS.notification.patch.replace(':id', id), {}),

    deleteNotification: (id: string) => 
      httpclient.delete(API_END_POINTS.notification.delete.replace(':id', id)),

    webshow: (data: any) => 
      httpclient.post(API_END_POINTS.notification.webshow, data),
  };
}

export default new Client();