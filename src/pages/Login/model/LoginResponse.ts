export interface LoginResponse {
  success: boolean;
  jwtToken: string;
  refreshToken: string;
  userId: string;
}
