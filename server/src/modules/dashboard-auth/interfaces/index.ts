export interface DashboardTokenPayload {
  sessionId: string;
  issuedAt: number;
  expiresAt: number;
  type: 'dashboard-access';
}

export interface DashboardAccessResponse {
  success: boolean;
  authenticated: boolean;
  message: string;
}

export interface DashboardLogoutResponse {
  success: boolean;
  message: string;
}

export interface DashboardVerifyResponse {
  success: boolean;
  authenticated: boolean;
}
