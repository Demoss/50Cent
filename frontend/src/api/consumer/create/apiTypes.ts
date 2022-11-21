export interface CreateRequest {
  name: string;
  surname: string;
  middle_name: string;
  photo?: File | null;
  work_file?: File | null;
  id_file?: File | null;
  property_file?: File | null;
}

export interface CreateResponse {
  status: string;
}
