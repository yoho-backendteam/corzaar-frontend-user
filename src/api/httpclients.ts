import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config: any) => {

  return config;
});

Axios.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (
      error?.response?.status === 401 &&
      error?.response?.statusText === "Unauthorized"
    ) {
      console.warn("Unauthorized — handle logout or refresh");
    }
    return Promise.reject(error);
  }
);

class HttpClient {
  async get(url: string, params?: any) {
    return Axios.get(url, { params });
  }

  async post(url: string, data: any, params?: any) {
    return Axios.post(url, data, { params });
  }

  async put(url: string, data: any) {
    return Axios.put(url, data);
  }

  async patch(url: string, data: any) {
    return Axios.patch(url, data);
  }

  async delete(url: string) {
    return Axios.delete(url);
  }

  async uploadFile(url: string, data: any) {
    return Axios.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export default new HttpClient();
