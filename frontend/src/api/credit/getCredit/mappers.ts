import {
  GetCreditRequest,
  GetCreditResponse,
} from '@/api/credit/getCredit/apiTypes';
import {
  GetCreditRequestApi,
  GetCreditResponseApi,
} from '@/api/credit/getCredit/apiTypes.server';

export function mapRequest(requestApi: GetCreditRequestApi): GetCreditRequest {
  return { creditId: requestApi.creditId };
}

export function mapResponse(
  responseApi: GetCreditResponseApi,
): GetCreditResponse {
  return {
    creditSum: responseApi.CreditSum,
    creditTitle: responseApi.CreditTitle,
    creditDescription: responseApi.CreditDescription,
    creditTerm: responseApi.CreditTerm,
    creditRate: responseApi.CreditRate,
    returnedInvestorMoney: responseApi.ReturnedInvestorMoney,
  };
}
