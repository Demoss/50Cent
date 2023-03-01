import {
  GetCreditWithConsumerRequestApi,
  GetCreditWithConsumerResponseApi,
} from '@/api/credit/getCreditWithConsumer/apiTypes.server';
import {
  GetCreditWithConsumerRequest,
  GetCreditWithConsumerResponse,
} from '@/api/credit/getCreditWithConsumer/apiTypes';

export function mapRequest(
  requestApi: GetCreditWithConsumerRequestApi,
): GetCreditWithConsumerRequest {
  return { creditId: requestApi.creditId };
}

export function mapResponse(
  responseApi: GetCreditWithConsumerResponseApi,
): GetCreditWithConsumerResponse {
  return {
    creditSum: responseApi.CreditSum,
    creditTitle: responseApi.CreditTitle,
    creditDescription: responseApi.CreditDescription,
    creditTerm: responseApi.CreditTerm,
    creditRate: responseApi.CreditRate,
    consumer: responseApi.Consumer,
    returnedInvestorMoney: responseApi.ReturnedInvestorMoney,
  };
}
