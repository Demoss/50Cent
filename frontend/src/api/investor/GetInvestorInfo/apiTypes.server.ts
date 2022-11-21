export interface GetInvestorInfoRequestApi {
  id: number;
}

export interface GetInvestorInfoResponseApi {
  Name: string;
  MiddleName: string;
  Surname: string;
  Photo: string;
  IDFile: string;
}
