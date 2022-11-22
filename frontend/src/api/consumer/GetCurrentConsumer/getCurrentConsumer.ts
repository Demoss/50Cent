import { GetApiFunc } from '@/api/base';

import { ConsumerModelResponse } from './apiTypes';
import { getCurrentConsumerApi } from './getCurrentConsumerApi';
import { mapResponse } from './mappers';

export const getCurrentConsumer = async (
  getApi: GetApiFunc,
): Promise<ConsumerModelResponse> => {
  const api = await getApi();

  return await getCurrentConsumerApi(api).then(mapResponse);
};
