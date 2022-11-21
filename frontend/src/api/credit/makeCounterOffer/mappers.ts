import {
  MakeCounterOfferRequest,
  GetCounterOfferResponse,
} from '@/api/credit/makeCounterOffer/apiTypes';

import {
  MakeCounterOfferRequestApi,
  GetCounterOfferResponseApi,
} from '@/api/credit/makeCounterOffer/apiTypes.server';

export function mapResponse(
  responseApi: GetCounterOfferResponseApi,
): GetCounterOfferResponse {
  return {
    status: responseApi.status,
  };
}

export function mapRequest(
  requestApi: MakeCounterOfferRequestApi,
): MakeCounterOfferRequest {
  return {
    creditId: requestApi.creditId,
    creditTerm: requestApi.creditTerm,
    creditRate: requestApi.creditRate,
  };
}
