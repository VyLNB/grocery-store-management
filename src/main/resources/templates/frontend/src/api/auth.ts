import type { AuthUser } from "../interface/auth";
import { apiRequest } from "./axios"; 
import { z } from "zod";

// Validation schemas
const SigninPayloadSchema = z.object({
  username: z.string().min(2, "Tên đăng nhập phải có ít nhất 2 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const SignupPayloadSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type SigninPayload = z.infer<typeof SigninPayloadSchema>;
export type SignupPayload = z.infer<typeof SignupPayloadSchema>;

// Response types phải khớp với backend
export interface AuthResponse {
  success: boolean;
  message: string;
  token: string; // ← Backend trả về token
  user: AuthUser; // ← Backend trả về user, không phải data
}

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

  const response = await apiRequest<AuthResponse>(
    "post",
    "/auth/login",
    credentials
  );
  
  // Lưu token vào localStorage
  if (response.token) {
    localStorage.setItem("token", response.token);
  }
  
  return response;
}

export async function signup(
  credentials: SignupPayload
): Promise<AuthResponse> {
  // Validate trước khi gửi
  SignupPayloadSchema.parse(credentials);
  
  // Backend endpoint là /auth/register
  const response = await apiRequest<AuthResponse>(
    "post",
    "/auth/register",
    credentials
  );
  
  // Lưu token vào localStorage
  if (response.token) {
    localStorage.setItem("token", response.token);
  }
  
  return response;
}

export async function signout(): Promise<void> {
  // Backend endpoint là /auth/logout và method là POST, không phải DELETE
  await apiRequest<void>("post", "/auth/logout", {});
  
  // Xóa token khỏi localStorage
  localStorage.removeItem("token");
}
