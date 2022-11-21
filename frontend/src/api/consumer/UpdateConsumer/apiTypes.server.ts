export interface UpdateConsumerRequestApi {
  id: number;
  name: string;
  surname: string;
  middle_name: string;
  photo?: File | undefined;
  id_file?: File | undefined;
  work_file?: File | undefined;
  property_file?: File | undefined;
}

export interface UpdateConsumerResponseApi {
  status: string;
}
