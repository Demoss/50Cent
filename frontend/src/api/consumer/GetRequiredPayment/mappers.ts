import { PaymentResponse } from './apiTypes';
import { PaymentApi } from './apiTypes.server';

export function mapResponse(responseApi: PaymentApi): PaymentResponse {
  return {
    payments: responseApi.payments,
  };
}
