// axios.ts
import axios, { AxiosError } from "axios";
// Import type riêng để tránh lỗi verbatimModuleSyntax
import type { InternalAxiosRequestConfig } from "axios";

// 1. Giữ nguyên Interface
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

// 2. Giữ nguyên Interceptor (để gắn token nếu có)
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

// 3. CẬP NHẬT HÀM NÀY
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
    
    // DEBUG: Hãy bật dòng này lên để xem chính xác Backend trả về cái gì
    console.log(`API Response [${url}]:`, responseData);

    // Kiểm tra nếu response có cấu trúc wrapper { success: ... }
    if (responseData && typeof responseData === 'object' && 'success' in responseData) {
      const apiResponse = responseData as any; // Dùng any để check linh hoạt
      
      if (apiResponse.success) {
        // CASE 1: Standard Wrapper - Dữ liệu nằm trong field 'data'
        // VD: { success: true, data: { token: "..." } }
        if ('data' in apiResponse) {
            return apiResponse.data as T;
        }

        // CASE 2: Flat Structure - Dữ liệu nằm ngay tại root (Trường hợp của bạn)
        // VD: { success: true, token: "...", user: { ... } }
        // Lúc này, ta trả về chính responseData
        return responseData as T;
      }
      
      throw new Error(
        apiResponse?.message || "Đã xảy ra lỗi không xác định từ máy chủ."
      );
    }
    
    // Trường hợp Backend trả về raw data không có wrapper
    return responseData as T;

  } catch (err) {
    console.error('API Request Error:', err);
    
    if (axios.isAxiosError(err)) {
        // Xử lý lỗi 403/401
        if (err.response?.status === 401 || err.response?.status === 403) {
            console.warn("Lỗi xác thực: Token sai hoặc hết hạn.");
            // Tùy chọn: localStorage.removeItem("token");
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