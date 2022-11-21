export interface GetCounterOfferResponse {
  status: string;
}

export interface MakeCounterOfferRequest {
  creditId: string | undefined;
  creditTerm: number;
  creditRate: number;
}
