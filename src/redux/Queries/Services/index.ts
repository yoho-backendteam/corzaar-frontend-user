/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../api/index";

export const sendQuery = async (data: any) => {
  const response = await Client.QueryService.sendQuery(data);
  if (response) {
    return response;
  }
};

export const getAllQueries = async (senderId: string) => {
  const response = await Client.QueryService.getQueries(senderId);
  if (response) {
    return response;
  }
};

export const adminReply = async (data: any) => {
  const response = await Client.QueryService.adminReply(data);
  if (response) {
    return response;
  }
};
