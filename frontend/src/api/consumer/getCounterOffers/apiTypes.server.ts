export type GetCounterOffersResponseApi = CounterOffersFromBack[];

export interface CounterOffersFromBack {
  ID: number;
  credit_title: string;
  credit_sum: number;
  credit_rate: number;
  credit_new_rate: number;
  credit_term: number;
  credit_new_term: number;
}
