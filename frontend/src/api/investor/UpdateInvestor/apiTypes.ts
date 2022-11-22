export interface UpdateInvestorRequest {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  photo?: File | undefined;
  idFile?: File | undefined;
}

export interface UpdateInvestorResponse {
  status: string;
}
