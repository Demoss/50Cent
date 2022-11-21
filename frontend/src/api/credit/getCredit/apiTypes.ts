export interface GetCreditResponse {
  creditSum: number;
  creditTitle: string;
  creditDescription: string;
  creditTerm: number;
  creditRate: number;
  returnedInvestorMoney: number;
}

export interface GetCreditRequest {
  creditId: string | undefined;
}
