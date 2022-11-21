import { AxiosInstance, AxiosResponse } from 'axios';

import { ConsumerModelResponse } from './apiTypes';

export const getCurrentConsumerApi = async (
  api: AxiosInstance,
): Promise<ConsumerModelResponse> => {
  const { data } = await api.request<
    void,
    AxiosResponse<ConsumerModelResponse>
  >({
    method: 'get',
    url: `/consumers/currentConsumer`,
  });

  return data;
};
