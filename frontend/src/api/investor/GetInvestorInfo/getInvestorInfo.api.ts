import { AxiosInstance, AxiosResponse } from 'axios';
import {
  GetInvestorInfoRequestApi,
  GetInvestorInfoResponseApi,
} from './apiTypes.server';

export const getInvestorInfoApi = async (
  api: AxiosInstance,
  requestApi: GetInvestorInfoRequestApi,
): Promise<GetInvestorInfoResponseApi> => {
  const { data } = await api.request<
    GetInvestorInfoRequestApi,
    AxiosResponse<GetInvestorInfoResponseApi>
  >({
    method: 'get',
    url: `/investors/${requestApi.id}`,
    data: requestApi,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
