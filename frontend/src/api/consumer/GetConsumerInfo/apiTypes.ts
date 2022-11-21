export interface GetConsumerInfoRequest {
  id: number;
}

export interface GetConsumerInfoResponse {
  Name: string;
  MiddleName: string;
  Surname: string;
  Photo: string;
  IDFile: string;
  WorkFile: string;
  PropertyFile: string;
}
