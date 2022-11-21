export interface GetCounterOfferResponseApi {
  status: string;
}

export interface MakeCounterOfferRequestApi {
  creditId: string | undefined;
  creditTerm: number;
  creditRate: number;
}
