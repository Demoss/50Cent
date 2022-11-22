import { GetRepayUrlRequest, GetRepayUrlResponse } from './apiTypes';
import {
  GetRepayUrlRequestApi,
  GetRepayUrlResponseApi,
} from './apiTypes.server';

export function mapRequest(
  requestApi: GetRepayUrlRequestApi,
): GetRepayUrlRequest {
  return {
    loanId: requestApi.loanId,
  };
}

export function mapResponse(
  responseApi: GetRepayUrlResponseApi,
): GetRepayUrlResponse {
  return {
    url: responseApi.url,
  };
}
