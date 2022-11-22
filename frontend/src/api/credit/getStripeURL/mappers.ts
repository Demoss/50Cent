import {
  GetStripeURLRequestApi,
  GetStripeURLResponseApi,
} from '@/api/credit/getStripeURL/apiTypes.server';
import {
  GetStripeURLRequest,
  GetStripeURLResponse,
} from '@/api/credit/getStripeURL/apiTypes';

export function mapRequest(
  requestApi: GetStripeURLRequestApi,
): GetStripeURLRequest {
  return {
    creditId: requestApi.creditId,
  };
}

export function mapResponse(
  responseApi: GetStripeURLResponseApi,
): GetStripeURLResponse {
  return {
    url: responseApi.url,
  };
}
