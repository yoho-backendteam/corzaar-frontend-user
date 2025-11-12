import Client from "../../../apis/index"; 

export const sendQuery = async (data:any) => {
  const response = await Client.QueryService.sendQuery(data);
  if (response) {
    return response;
  }
};

export const getQueries = async (params:any) => {
  const response = await Client.QueryService.getQueries(params);
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
