export interface InvestorLoan {
  ID: number;
  CreditSum: number;
  CreditTitle: string;
  CreditDesc: string;
  CreditTerm: number;
  CreditRate: number;
  ReturnedAmount: number;
  IsReturned: boolean;
  IsAccepted: boolean;
  LatestPaymount: string;
  ConsumerID: number;
  InvestorID: number;
  ConsumerName: string;
  ConsumerSurname: string;
}

export interface InvestorLoanApi {
  loans: InvestorLoan[];
}
