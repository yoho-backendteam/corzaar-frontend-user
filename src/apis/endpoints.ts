
export const API_END_POINTS = {
  Query: {
    POST: "/api/querysend",          
    GET: (senderId: string, senderRole: string) =>`/api/queryview/${senderId}/${senderRole}`,         
    adminPOST: "/api/adminreplay",  
  },
};
