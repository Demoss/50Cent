import { AxiosInstance, AxiosResponse } from 'axios';
import {
  GetCreditRequestApi,
  GetCreditResponseApi,
} from '@/api/credit/getCredit/apiTypes.server';

export const getCreditApi = async (
  api: AxiosInstance,
  requestApi: GetCreditRequestApi,
): Promise<GetCreditResponseApi> => {
  const { data } = await api.request<
    GetCreditResponseApi,
    AxiosResponse<GetCreditResponseApi>
  >({
    method: 'get',
    url: `/loans/${requestApi.creditId}`,
  });

  return data;
};
