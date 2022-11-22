export type GetAcceptedLoansResponseApi = LoansFromBack[];

export interface LoansFromBack {
  ID: number;
  credit_sum: number;
  credit_title: string;
  credit_term: number;
  investor_id: number;
  returned_amount: number;
  accepted_at: Date;
}
