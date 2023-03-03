import { Loans } from './apiTypes';
import { LoansFromBack } from './apiTypes.server';

export function mapAcceptedLoans(loansFromBack: LoansFromBack[]): Loans[] {
  return loansFromBack.map((e) => ({
    key: e.ID,
    CreditSum: e.credit_sum,
    CreditTitle: e.credit_title,
    CreditTerm: e.credit_term,
    InvestorId: e.investor_id,
    ReturnedAmount: e.returned_amount,
    AcceptedAt: e.accepted_at,

    //-----fields for table
    PercentOfPayment:
      ((e.credit_sum -
        (e.credit_sum / e.credit_term) * (e.credit_term - e.returned_amount)) /
        e.credit_sum) *
      100,

    FinalPaymentDate: new Date(
      new Date(e.accepted_at).setMonth(
        new Date(e.accepted_at).getMonth() + e.credit_term,
      ),
    ).toLocaleDateString(),
    MinMonthlyPayment: Math.round(e.credit_sum / e.credit_term),
  }));
}
