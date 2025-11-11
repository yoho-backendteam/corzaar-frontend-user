import axios from "axios";
const Axios = axios.create({
    // baseURL: import.meta.env.VITE_PUBLIC_API_URL,
    baseURL: "http://localhost:3003",
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
    },
});





class HttpClient {
    async get(url: string, params?: any) {
        const reponse = await Axios.get(url, { params });
        return reponse;
    }
    async post(url: string, data: any, params?: any) {
        const response =await Axios.post(url, data, { params });
        return response;
    }
    async patch(url: string, data: any) {
        const response =await Axios.patch(url, data);
        return response;
    }
    async put(url: string, data: any, params?: string) {
        const response =await Axios.put(url, data, { params });
        return response;
    }
    async delete(url: string, data: any) {
        const response =await Axios.delete(url,data);
        return response;
    }
    async uploadFile(url: string, data: any) {
        const response = Axios.post(url, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response;
    }
}

export default new HttpClient();