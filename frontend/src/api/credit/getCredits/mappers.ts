import { GetCreditResponseWithKeys } from './apiTypes';
import { GetCreditResponseApi } from './apiTypes.server';

export function mapResponse(
  responseApi: GetCreditResponseApi,
): GetCreditResponseWithKeys {
  return {
    totalPages: responseApi.TotalPages,
    data: responseApi.Data.map((el, index) => {
      const a = {
        key: `${index}`,
        CreditID: el.ID,
        CreditSum: el.CreditSum,
        CreditTitle: el.CreditTitle,
        CreditDescription: el.CreditDescription,
        CreditTerm: el.CreditTerm,
        CreditRate: el.CreditRate,
        ReturnedAmount: el.ReturnedAmount,
        IsReturned: el.IsReturned,
        IsAccepted: el.IsAccepted,
        AcceptedAt: el.AcceptedAt,
        ConsumerID: el.ConsumerID,
        InvestorID: el.InvestorID,
        CreditAction: 'Дeтальніше',
      };

      return a;
    }),
  };
}
