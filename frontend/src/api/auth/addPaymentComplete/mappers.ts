import { PaymentCompleteResponse } from './apiTypes';
import { PaymentCompleteResponseApi } from './apiTypes.server';

export function mapResponse(
  responseApi: PaymentCompleteResponseApi,
): PaymentCompleteResponse {
  return {
    token: responseApi.token,
  };
}
