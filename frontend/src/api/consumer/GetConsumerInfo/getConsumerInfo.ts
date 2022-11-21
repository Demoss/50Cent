import {
  mapRequest,
  mapResponse,
} from '@/api/consumer/GetConsumerInfo/mappers';
import { GetApiFunc } from '@/api/base';
import { getConsumerInfoApi } from './getConsumerInfo.api';
import { GetConsumerInfoRequest, GetConsumerInfoResponse } from './apiTypes';

export const getConsumerInfo = async (
  getApi: GetApiFunc,
  request: GetConsumerInfoRequest,
): Promise<GetConsumerInfoResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return getConsumerInfoApi(api, requestApi).then(mapResponse);
};
