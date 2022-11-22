export interface UpdateInvestorRequestApi {
  id: number;
  name: string;
  surname: string;
  middle_name: string;
  photo?: File | undefined;
  id_file?: File | undefined;
}

export interface UpdateInvestorResponseApi {
  status: string;
}
