import { GetApiFunc } from '@/api/base';
import { GetRepayUrlResponse } from './apiTypes';
import { GetRepayUrlRequestApi } from './apiTypes.server';
import { getRepayStripeUrlApi } from './getRepayUrl.api';
import { mapRequest, mapResponse } from './mappers';

export const getRepayStripeUrl = async (
  getApi: GetApiFunc,
  request: GetRepayUrlRequestApi,
): Promise<GetRepayUrlResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return getRepayStripeUrlApi(api, requestApi).then(mapResponse);
};
