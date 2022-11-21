import { AxiosInstance, AxiosResponse } from 'axios';
import { GetStripeURLResponseApi } from '@/api/credit/getStripeURL/apiTypes.server';
import { GetStripeURLRequest } from '@/api/credit/getStripeURL/apiTypes';

export const getStripeURLApi = async (
  api: AxiosInstance,
  requestApi: GetStripeURLRequest,
): Promise<GetStripeURLResponseApi> => {
  const { data } = await api.request<
    GetStripeURLResponseApi,
    AxiosResponse<GetStripeURLResponseApi>
  >({
    method: 'post',
    url: `/loans/${requestApi.creditId}/accept`,
  });

  return data;
};
