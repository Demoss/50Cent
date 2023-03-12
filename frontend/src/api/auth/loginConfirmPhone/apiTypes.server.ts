export interface LoginConfirmPhoneRequestApi {
  code: number;
}

export interface LoginConfirmPhoneResponseApi {
  token: string;
  refresh: string;
}
