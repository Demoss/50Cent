import { ConsumerModelResponse } from './apiTypes';
import { ConsumerModel } from './apiTypes.server';

export function mapResponse(responseApi: ConsumerModel): ConsumerModelResponse {
  return {
    ID: responseApi.ID,
    Name: responseApi.Name,
    MiddleName: responseApi.MiddleName,
    Surname: responseApi.Surname,
    UserEmail: responseApi.UserEmail,
    Balance: responseApi.Balance,
    Role: responseApi.Role,
  };
}
