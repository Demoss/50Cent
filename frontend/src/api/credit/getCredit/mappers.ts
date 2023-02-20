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
    creditSum: Number((Math.round(responseApi.CreditSum * 100)/ 100).toFixed(2)),
    creditTitle: responseApi.CreditTitle,
    creditDescription: responseApi.CreditDescription,
    creditTerm: responseApi.CreditTerm,
    creditRate: responseApi.CreditRate,
    returnedInvestorMoney: Number((Math.round(responseApi.ReturnedInvestorMoney * 100)/ 100).toFixed(2)),
  };
}
