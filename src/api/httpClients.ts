/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { GetLocalstorage } from "../utils/helper";

const Axios = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_URL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
    },
});

Axios.interceptors.request.use((config: any) => {
    const token = GetLocalstorage("cu_t_a")
    if (token) {
        config.headers["Authorization"] = `${token}`
    }
    return config
})

Axios.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        if (
            error?.response &&
            error?.response?.status === 401 &&
            error?.response?.statusText === 'Unauthorized'
        ) {
            // ClearLocalStorage()
        }
        return Promise.reject(error);
    }
);

class HttpClient {
    async get(url: string, params?: any) {
        const reponse = await Axios.get(url, { params });
        return reponse;
    }
    async post(url: string, data?: any, params?: any) {
        const response = await Axios.post(url, data, { params });
        return response;
    }
    async patch(url: string, data: any) {
        const response = await Axios.patch(url, data);
        return response;
    }
    async put(url: string, data: any, params?: string) {
        const response = await Axios.put(url, data, { params });
        return response;
    }
    async delete(url: string, params?: string) {
        const response = await Axios.delete(url, { params });
        return response;
    }
    async uploadFile(url: string, data: any) {
        const response = await Axios.post(url, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response;
    }
}

export default new HttpClient();
