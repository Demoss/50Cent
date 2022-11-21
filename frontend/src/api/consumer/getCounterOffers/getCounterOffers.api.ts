import { AxiosInstance, AxiosResponse } from 'axios';
import { GetCounterOffersResponseApi } from './apiTypes.server';

export const getCounterOffersApi = async (
  api: AxiosInstance,
): Promise<GetCounterOffersResponseApi> => {
  const { data } = await api.request<
    GetCounterOffersResponseApi,
    AxiosResponse<GetCounterOffersResponseApi>
  >({
    method: 'get',
    url: `/loans/personalcounteroffers`,
  });

  return data;
};
