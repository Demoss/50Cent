import { mapRequest, mapResponse } from '@/api/consumer/UpdateConsumer/mappers';
import { GetApiFunc } from '@/api/base';
import { UpdateConsumerRequest, UpdateConsumerResponse } from './apiTypes';
import { updateConsumerApi } from './UpdateConsumer.api';

export const updateConsumer = async (
  getApi: GetApiFunc,
  request: UpdateConsumerRequest,
): Promise<UpdateConsumerResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return updateConsumerApi(api, requestApi).then(mapResponse);
};
