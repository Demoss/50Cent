export interface GetCreditWithConsumerResponse {
  creditSum: number;
  creditTitle: string;
  creditDescription: string;
  creditTerm: number;
  creditRate: number;
  consumer: number;
  returnedInvestorMoney: number;
}

export interface GetCreditWithConsumerRequest {
  creditId: string | undefined;
}
