export interface GetCreditResponseApi {
  CreditSum: number;
  CreditTitle: string;
  CreditDescription: string;
  CreditTerm: number;
  CreditRate: number;
  ReturnedInvestorMoney: number;
}

export interface GetCreditRequestApi {
  creditId: string | undefined;
}
