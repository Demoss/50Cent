import { UpdateInvestorRequest, UpdateInvestorResponse } from './apiTypes';
import {
  UpdateInvestorRequestApi,
  UpdateInvestorResponseApi,
} from './apiTypes.server';

export function mapRequest(
  request: UpdateInvestorRequest,
): UpdateInvestorRequestApi {
  return {
    id: request.id,
    name: request.name,
    surname: request.surname,
    middle_name: request.middleName,
    id_file: request.idFile,
    photo: request.photo,
  };
}

export function mapResponse(
  responseApi: UpdateInvestorResponseApi,
): UpdateInvestorResponse {
  return {
    status: responseApi.status,
  };
}
