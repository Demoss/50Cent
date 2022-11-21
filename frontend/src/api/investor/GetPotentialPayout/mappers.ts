import { PayoutResponse } from './apiTypes';
import { PayoutApi } from './apiTypes.server';

export function mapResponse(responseApi: PayoutApi): PayoutResponse {
  return {
    payouts: responseApi.payouts,
  };
}
