export interface LoginConfirmForm {
  code: number;
}

export interface LoginConfirmToken {
  email: string;
  exp: string;
  isTemporary: boolean;
  role: string;
  userID: number;
}
