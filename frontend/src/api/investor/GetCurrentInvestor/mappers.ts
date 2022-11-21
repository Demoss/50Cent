import { InvestorModelResponse } from './apiTypes';
import { InvestorModel } from './apiTypes.server';

export function mapResponse(responseApi: InvestorModel): InvestorModelResponse {
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
