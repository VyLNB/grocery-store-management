export interface AuthUser {
  id: number; 
  email: string;
  username: string; 
}

export interface AuthResponse {
  accessToken: string; 
  userDetail: AuthUser; 
}