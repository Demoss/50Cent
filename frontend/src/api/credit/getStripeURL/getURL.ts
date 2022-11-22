import { GetApiFunc } from '@/api/base';
import { GetStripeURLRequestApi } from '@/api/credit/getStripeURL/apiTypes.server';
import { GetStripeURLResponse } from '@/api/credit/getStripeURL/apiTypes';
import { getStripeURLApi } from '@/api/credit/getStripeURL/getURL.api';
import { mapRequest, mapResponse } from '@/api/credit/getStripeURL/mappers';

export const getStripeURL = async (
  getApi: GetApiFunc,
  request: GetStripeURLRequestApi,
): Promise<GetStripeURLResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return getStripeURLApi(api, requestApi).then(mapResponse);
};
