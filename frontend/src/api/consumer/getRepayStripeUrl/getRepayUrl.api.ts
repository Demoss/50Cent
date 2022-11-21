import { AxiosInstance, AxiosResponse } from 'axios';
import { GetRepayUrlRequest } from './apiTypes';
import { GetRepayUrlResponseApi } from './apiTypes.server';

export const getRepayStripeUrlApi = async (
  api: AxiosInstance,
  requestApi: GetRepayUrlRequest,
): Promise<GetRepayUrlResponseApi> => {
  const { data } = await api.request<
    GetRepayUrlResponseApi,
    AxiosResponse<GetRepayUrlResponseApi>
  >({
    method: 'post',
    url: `/loans/${requestApi.loanId}/repay`,
  });
  return data;
};
