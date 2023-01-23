export interface RefreshTokenResponse {
  success: boolean;
  jwtToken: string;
  refreshToken: string;
  userId: string;
}
