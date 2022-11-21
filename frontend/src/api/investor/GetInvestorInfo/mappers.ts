import { GetInvestorInfoRequest, GetInvestorInfoResponse } from './apiTypes';
import {
  GetInvestorInfoRequestApi,
  GetInvestorInfoResponseApi,
} from './apiTypes.server';

export function mapRequest(
  request: GetInvestorInfoRequest,
): GetInvestorInfoRequestApi {
  return {
    id: request.id,
  };
}

export function mapResponse(
  responseApi: GetInvestorInfoResponseApi,
): GetInvestorInfoResponse {
  return {
    Name: responseApi.Name,
    MiddleName: responseApi.MiddleName,
    Surname: responseApi.Surname,
    Photo: responseApi.Photo,
    IDFile: responseApi.IDFile,
  };
}
