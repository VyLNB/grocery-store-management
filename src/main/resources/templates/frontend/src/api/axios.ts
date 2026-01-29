import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export interface ApiResponse<T = unknown> {
    success: boolean;
    data: T;
    message?: string;
    timestamp: string;
}

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export function setAuthToken(token: string) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function apiRequest<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  payload?: unknown
): Promise<T> {
  try {
    const response = await apiClient.request({
      method,
      url: url,
      data: payload,
    });

    const responseData = response.data;
    
    console.log(`API Response [${url}]:`, responseData);

    if (responseData && typeof responseData === 'object' && 'success' in responseData) {
      const apiResponse = responseData as any; // Dùng any để check linh hoạt
      
      if (apiResponse.success) {
        if ('data' in apiResponse) {
            return apiResponse.data as T;
        }
        return responseData as T;
      }
      
      throw new Error(
        apiResponse?.message || "Đã xảy ra lỗi không xác định từ máy chủ."
      );
    }
    
    return responseData as T;

  } catch (err) {
    console.error('API Request Error:', err);
    
    if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.status === 403) {
            console.warn("Lỗi xác thực: Token sai hoặc hết hạn.");
        }

      const serverError = (err as AxiosError<ApiResponse>).response?.data;
      if (serverError) {
        throw new Error(serverError.message || "Lỗi từ máy chủ");
      }
      throw new Error(err.message || "Lỗi kết nối mạng.");
    }
    throw err;
  }
}