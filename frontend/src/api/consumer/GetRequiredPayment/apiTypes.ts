export interface PaymentResponse {
  ID: number;
  Amount: number;
}

export interface Payments {
  payouts: PaymentResponse[];
}
