export interface GetCreditWithConsumerResponseApi {
  CreditSum: number;
  CreditTitle: string;
  CreditDescription: string;
  CreditTerm: number;
  CreditRate: number;
  Consumer: number;
  ReturnedInvestorMoney: number;
}

export interface GetCreditWithConsumerRequestApi {
  creditId: string | undefined;
}
