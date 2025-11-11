import httpClient from "../api/httpClient";
import { API_END_POINTS } from "../api/endpoints";
import type { Institute } from "../types/institute";

class Client {
  instituteManagement = {
    getAll: () =>
      httpClient.get(API_END_POINTS.instituteManagement.getAll),

    getById: (id: string) =>
      httpClient.get(API_END_POINTS.instituteManagement.getById.replace(":id", id)),

    updateById: (id: string, data: Partial<Institute>) =>
      httpClient.put(API_END_POINTS.instituteManagement.updateById.replace(":id", id), data),

    deleteById: (id: string) =>
      httpClient.delete(API_END_POINTS.instituteManagement.deleteById.replace(":id", id)),

    getStudentsByInstitute: (id: string) =>
      httpClient.get(API_END_POINTS.instituteManagement.getStudentsByInstitute.replace(":id", id)),

    getCoursesByInstitute: (id: string) =>
      httpClient.get(API_END_POINTS.instituteManagement.getCoursesByInstitute.replace(":id", id)),

    searchById: (id: string) =>
      httpClient.get(API_END_POINTS.instituteManagement.searchById.replace(":id", id)),
  };
}

export default new Client();
