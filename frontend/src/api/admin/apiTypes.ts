export const enum roles {
  creditor = 'Consumer',
  investor = 'Investor',
}

export type UI_ROLES = roles | undefined;

export interface User {
  key: number;
  role: roles;
  name: string;
  photo: string;
  passport: string;
  workplace: string;
  property: string;
}

export const enum adminActions {
  approve = 'activated',
  reject = 'rejected',
}
