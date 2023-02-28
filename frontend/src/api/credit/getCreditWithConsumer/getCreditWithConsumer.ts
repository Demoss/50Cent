import { GetApiFunc } from '@/api/base';
import { GetCreditWithConsumerRequestApi } from '@/api/credit/getCreditWithConsumer/apiTypes.server';
import { GetCreditWithConsumerResponse } from '@/api/credit/getCreditWithConsumer/apiTypes';
import { getCreditWithConsumerApi } from '@/api/credit/getCreditWithConsumer/getCreditWithConsumer.api';
import {
  mapRequest,
  mapResponse,
} from '@/api/credit/getCreditWithConsumer/mappers';

export const getCreditWithConsumer = async (
  getApi: GetApiFunc,
  request: GetCreditWithConsumerRequestApi,
): Promise<GetCreditWithConsumerResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return getCreditWithConsumerApi(api, requestApi).then(mapResponse);
};
