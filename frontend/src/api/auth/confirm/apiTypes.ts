export interface ConfirmRequest {
  email: string;
  code: string;
}

export interface ConfirmResponse {
  status: string;
}
