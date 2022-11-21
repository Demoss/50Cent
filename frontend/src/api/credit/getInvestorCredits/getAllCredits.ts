import { GetApiFunc } from '@/api/base';

import { GetInvestorCreditResponseWithKeys } from './apiTypes';
import { getAllInvestorCreditsApi } from './getAllInvestorCreditsApi';
import { mapResponse } from './mappers';

export const getAllInvestorCredits = async (
  getApi: GetApiFunc,
): Promise<GetInvestorCreditResponseWithKeys> => {
  const api = await getApi();

  return await getAllInvestorCreditsApi(api).then(mapResponse);
};
