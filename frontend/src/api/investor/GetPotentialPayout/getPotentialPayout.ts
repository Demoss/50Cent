import { GetApiFunc } from '@/api/base';
import { PayoutResponse } from './apiTypes';
import { getPotentialPayoutApi } from './getPotentialPayoutApi';
import { mapResponse } from './mappers';

export const getPotentialPayout = async (
  getApi: GetApiFunc,
): Promise<PayoutResponse> => {
  const api = await getApi();

  return await getPotentialPayoutApi(api).then(mapResponse);
};
