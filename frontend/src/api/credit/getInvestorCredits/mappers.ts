import { GetInvestorCreditResponseWithKeys } from './apiTypes';
import { InvestorLoanApi } from './apiTypes.server';

export function mapResponse(
  responseApi: InvestorLoanApi,
): GetInvestorCreditResponseWithKeys {
  return {
    data: responseApi.loans.map((el, index) => {
      const a = {
        key: `${index}`,
        CreditSum: el.CreditSum,
        CreditTitle: el.CreditTitle,
        CreditDesc: el.CreditDesc,
        CreditTerm: el.CreditTerm,
        CreditRate: el.CreditRate,
        ReturnedAmount: el.ReturnedAmount,
        IsReturned: el.IsReturned,
        IsAccepted: el.IsAccepted,
        LatestPaymount: `${new Date(el.LatestPaymount).toLocaleDateString(
          'uk-UA',
          { year: 'numeric', month: 'long', day: 'numeric' },
        )}`,
        ConsumerID: el.ConsumerID,
        InvestorID: el.InvestorID,
        ConsumerName: el.ConsumerName,
        ConsumerSurname: el.ConsumerSurname,
      };

      return a;
    }),
  };
}
