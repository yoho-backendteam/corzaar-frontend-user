

import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  timeout: 50000,
  headers: { "Content-Type": "application/json" },
});

Axios.interceptors.request.use((config: any) => {
  
  const encodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  
  if (encodedToken) {
    config.headers.Authorization = `Bearer ${encodedToken}`;
  }
  
  console.log(" Sending Request with Token:", config.headers.Authorization);
  return config;
});

Axios.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error?.response && error?.response?.status === 401 && error?.response?.statusText === "Unauthorized") {
      
      console.log(" Token expired or invalid");
    }
    return Promise.reject(error);
  }
);

class HttpClient {
  async get(url: string, params?: any) {
    const response = Axios.get(url, { params });
    return response;
  }
  async post(url: string, data: any, params?: any) {
    const response = Axios.post(url, data, { params });
    return response;
  }
  async patch(url: string, data: any) {
    const response = Axios.patch(url, data);
    return response;
  }
  async put(url: string, data: any) {
    const response = Axios.put(url, data);
    return response;
  }
  async delete(url: string) {
    const response = Axios.delete(url);
    return response;
  }
  async uploadFile(url: string, data: any) {
    const response = Axios.post(url, data, { headers: { "Content-Type": "multipart/form-data" } });
    return response;
  }
}

export default new HttpClient();
