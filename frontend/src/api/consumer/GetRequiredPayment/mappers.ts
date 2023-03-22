import { PaymentResponse, Payments } from './apiTypes';
import { PaymentApi, PaymentArr } from './apiTypes.server';

export function mapResponse(responseApi: PaymentArr): Payments {
  return {
    payouts: responseApi.payouts.map((e) => {
      const a = {
        ID: e.ID,
        Amount: e.Amount,
      };
      return a;
    }),
  };
}
