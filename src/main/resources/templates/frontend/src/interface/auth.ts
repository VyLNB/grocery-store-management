export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

// Auth Response từ login/register
export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: AuthUser;
}

