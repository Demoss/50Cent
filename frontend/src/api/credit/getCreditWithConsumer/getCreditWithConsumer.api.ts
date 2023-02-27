import { AxiosInstance, AxiosResponse } from 'axios';
import {
  GetCreditWithConsumerRequestApi,
  GetCreditWithConsumerResponseApi,
} from '@/api/credit/getCreditWithConsumer/apiTypes.server';

export const getCreditWithConsumerApi = async (
  api: AxiosInstance,
  requestApi: GetCreditWithConsumerRequestApi,
): Promise<GetCreditWithConsumerResponseApi> => {
  const { data } = await api.request<
    GetCreditWithConsumerResponseApi,
    AxiosResponse<GetCreditWithConsumerResponseApi>
  >({
    method: 'get',
    url: `/loans/${requestApi.creditId}/details`,
  });

  return data;
};
