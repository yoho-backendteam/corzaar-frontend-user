import Client from "../../../api/index"; 

export const sendQuery = async (data:any) => {
  const response = await Client.QueryService.sendQuery(data);
  if (response) {
    return response;
  }
};

export const getAllQueries = async (senderId:string, senderRole:string) => {
  const response = await Client.QueryService.getQueries(senderId, senderRole);
  if (response) {
    return response;
  }
};

export const adminReply = async (data:any) => {
  const response = await Client.QueryService.adminReply(data);
  if (response) {
    return response;
  }
};
