import { InvestorLoan } from './apiTypes.server';

export interface InvestorLoanWithKeys extends InvestorLoan {
  key: string;
}
export interface GetInvestorCreditResponseWithKeys {
  data: Omit<InvestorLoanWithKeys, 'ID'>[];
}
