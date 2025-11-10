import client from "../../../api/index";
import type { Institute } from "../../../types/institute";

export const instituteService = {
getAll: async (): Promise<Institute[]> => {
  const response = await client.instituteManagement.getAll();
  
  const data = response.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.payload?.institutes)) return data.payload.institutes;

  console.error("Unexpected API response format:", data);
  return []; 
},


  getById: async (id: string): Promise<Institute> => {
  const response = await client.instituteManagement.getById(id);
  return response.data.data;
},

  updateById: async (id: string, data: Partial<Institute>): Promise<Institute> => {
    const response = await client.instituteManagement.updateById(id, data);
    return response.data;
  },

  deleteById: async (id: string): Promise<{ message: string }> => {
    const response = await client.instituteManagement.deleteById(id);
    return response.data;
  },

  getStudentsByInstitute: async (id: string) => {
    const response = await client.instituteManagement.getStudentsByInstitute(id);
    return response.data;
  },

  getCoursesByInstitute: async (id: string) => {
    const response = await client.instituteManagement.getCoursesByInstitute(id);
    return response.data;
  },

 searchById: async (instituteId: string): Promise<Institute> => {
  const response = await client.instituteManagement.searchById(`/${instituteId}`);
  return response.data;
},

};

