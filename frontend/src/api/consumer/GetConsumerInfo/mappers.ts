import { GetConsumerInfoRequest, GetConsumerInfoResponse } from './apiTypes';
import {
  GetConsumerInfoRequestApi,
  GetConsumerInfoResponseApi,
} from './apiTypes.server';

export function mapRequest(
  request: GetConsumerInfoRequest,
): GetConsumerInfoRequestApi {
  return {
    id: request.id,
  };
}

export function mapResponse(
  responseApi: GetConsumerInfoResponseApi,
): GetConsumerInfoResponse {
  return {
    Name: responseApi.Name,
    MiddleName: responseApi.MiddleName,
    Surname: responseApi.Surname,
    Photo: responseApi.Photo,
    IDFile: responseApi.IDFile,
    WorkFile: responseApi.IDFile,
    PropertyFile: responseApi.IDFile,
  };
}
