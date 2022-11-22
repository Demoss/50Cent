import { GetApiFunc } from '@/api/base';

import { InvestorModelResponse } from './apiTypes';
import { getCurrentInvestorApi } from './getCurrentInvestorApi';
import { mapResponse } from './mappers';

export const getCurrentInvestor = async (
  getApi: GetApiFunc,
): Promise<InvestorModelResponse> => {
  const api = await getApi();

  return await getCurrentInvestorApi(api).then(mapResponse);
};
