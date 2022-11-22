import { AxiosInstance, AxiosResponse } from 'axios';
import {
  GetConsumerInfoRequestApi,
  GetConsumerInfoResponseApi,
} from './apiTypes.server';

export const getConsumerInfoApi = async (
  api: AxiosInstance,
  requestApi: GetConsumerInfoRequestApi,
): Promise<GetConsumerInfoResponseApi> => {
  const { data } = await api.request<
    GetConsumerInfoRequestApi,
    AxiosResponse<GetConsumerInfoResponseApi>
  >({
    method: 'get',
    url: `/consumers/${requestApi.id}`,
    data: requestApi,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
