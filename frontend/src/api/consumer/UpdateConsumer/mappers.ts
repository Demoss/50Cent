import { UpdateConsumerRequest, UpdateConsumerResponse } from './apiTypes';
import {
  UpdateConsumerRequestApi,
  UpdateConsumerResponseApi,
} from './apiTypes.server';

export function mapRequest(
  request: UpdateConsumerRequest,
): UpdateConsumerRequestApi {
  return {
    id: request.id,
    name: request.name,
    surname: request.surname,
    middle_name: request.middleName,
    id_file: request.idFile,
    photo: request.photo,
    work_file: request.workFile,
    property_file: request.propertyFile,
  };
}

export function mapResponse(
  responseApi: UpdateConsumerResponseApi,
): UpdateConsumerResponse {
  return {
    status: responseApi.status,
  };
}
