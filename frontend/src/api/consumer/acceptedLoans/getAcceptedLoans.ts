import { GetApiFunc } from '@/api/base';
import { Loans } from './apiTypes';
import { getAcceptedLoansApi } from '@/api/consumer/acceptedLoans/getAcceptedLoans.api';
import { mapAcceptedLoans } from './mappers';

export const getAcceptedLoans = async (
  getApi: GetApiFunc,
): Promise<Loans[]> => {
  const api = await getApi();
  return getAcceptedLoansApi(api).then((data) => {
    return mapAcceptedLoans(data);
  });
};
