export interface ConfirmRequestApi {
  email: string;
  code: string;
}

export interface ConfirmResponseApi {
  status: string;
}
