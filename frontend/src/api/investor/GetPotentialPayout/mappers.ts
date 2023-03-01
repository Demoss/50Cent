import { PayoutResponse } from './apiTypes';
import { PayoutApi } from './apiTypes.server';

export function mapResponse(responseApi: PayoutApi): PayoutResponse {
  return {
    payouts: Math.round((responseApi.payouts + Number.EPSILON) * 100) / 100,
  };
}
