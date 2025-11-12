import HttpClient from "./httpclients";
import { API_END_POINTS } from "./endpoints";

export const QueryService = {
    
  sendQuery: (data: any) => HttpClient.post(API_END_POINTS.Query.POST, data),

  getQueries: (senderId: string, senderRole: string) => HttpClient.get(API_END_POINTS.Query.GET(senderId, senderRole)),

  adminReply: (data: any) => HttpClient.post(API_END_POINTS.Query.adminPOST, data),
};

export default {
  QueryService,
};
