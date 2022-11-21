export interface GetInvestorInfoRequest {
  id: number;
}

export interface GetInvestorInfoResponse {
  Name: string;
  MiddleName: string;
  Surname: string;
  Photo: string;
  IDFile: string;
}
