import type { AuthUser } from "../interface/auth";
import { apiRequest } from "./axios"; 
import { z } from "zod";

// --- Validation schemas (Giữ nguyên) ---
const SigninPayloadSchema = z.object({
  username: z.string().min(2, "Tên đăng nhập phải có ít nhất 2 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const SignupPayloadSchema = z.object({
  username: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type SigninPayload = z.infer<typeof SigninPayloadSchema>;
export type SignupPayload = z.infer<typeof SignupPayloadSchema>;

// --- SỬA LẠI INTERFACE CHO KHỚP API ---
export interface AuthResponse {
  // Postman không trả về success/message ở tầng data đã unwrap,
  // nhưng nếu axios unwrap rồi thì ta chỉ cần quan tâm bên trong data:
  accessToken: string; // SỬA: token -> accessToken
  user: AuthUser; 
}
// ----------------------------------------

export interface UserProfileResponse {
  success: boolean;
  user: AuthUser;
}

// Auth functions
export async function signin(
  credentials: SigninPayload
): Promise<AuthResponse> {
  // Validate trước khi gửi
  SigninPayloadSchema.parse(credentials);

  // Gọi API
  const response = await apiRequest<AuthResponse>(
    "post",
    "/auth/login",
    credentials
  );
  
  // DEBUG: Xem kết quả thực tế nhận được
  console.log("Login Response Data:", response);

  // --- SỬA LẠI LOGIC LƯU TOKEN ---
  // API trả về 'accessToken', không phải 'token'
  if (response && response.accessToken) {
    localStorage.setItem("token", response.accessToken);
    console.log("Đã lưu token vào LocalStorage:", response.accessToken);
  } else {
    console.error("Không tìm thấy accessToken trong phản hồi!");
  }
  // -------------------------------
  
  return response;
}

export async function signup(
  credentials: SignupPayload
): Promise<AuthUser> { 
  SignupPayloadSchema.parse(credentials);
  
  return await apiRequest<AuthUser>(
    "post",
    "/auth/register",
    credentials
  );
}

export async function signout(): Promise<void> {
  await apiRequest<void>("post", "/auth/logout", {});
  localStorage.removeItem("token");
}