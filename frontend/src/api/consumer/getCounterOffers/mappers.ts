import { CounterOffers } from './apiTypes';
import { CounterOffersFromBack } from './apiTypes.server';

export function mapCounterOffers(
  loansFromBack: CounterOffersFromBack[],
): CounterOffers[] {
  return loansFromBack.map((e) => ({
    key: e.ID,
    CreditTitle: e.credit_title,
    CreditSum: e.credit_sum,
    CreditRate: e.credit_rate,
    CreditNewRate: e.credit_new_rate,
    CreditTerm: e.credit_term,
    CreditNewTerm: e.credit_new_term,

    TotalSum:
      Math.round(
        (e.credit_sum + (e.credit_sum / 100) * e.credit_rate) * 0.005 * 100,
      ) / 100,
    TotalNewSum:
      Math.round(
        (e.credit_sum + (e.credit_sum / 100) * e.credit_new_rate) * 100,
      ) / 100,
    MonthlyPayment:
      Math.round(
        (e.credit_sum / e.credit_new_term / 100) * e.credit_rate * 100,
      ) / 100,
    NewMonthlyPayment:
      Math.round(
        (e.credit_sum / e.credit_new_term / 100) * e.credit_new_rate * 100,
      ) / 100,
  }));
}
