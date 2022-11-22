export interface Loans {
  key: number;
  CreditSum: number;
  CreditTitle: string;
  CreditTerm: number;
  InvestorId: number;
  ReturnedAmount: number;
  AcceptedAt: Date;

  //---fileds for table
  PercentOfPayment: number;
  FinalPaymentDate: string;
  MinMonthlyPayment: number;
}
