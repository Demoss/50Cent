export interface UpdateConsumerRequest {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  photo?: File | undefined;
  idFile?: File | undefined;
  workFile?: File | undefined;
  propertyFile?: File | undefined;
}

export interface UpdateConsumerResponse {
  status: string;
}
