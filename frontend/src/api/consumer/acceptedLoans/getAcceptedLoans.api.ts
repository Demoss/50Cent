import { AxiosInstance, AxiosResponse } from 'axios';
import { GetAcceptedLoansResponseApi } from './apiTypes.server';

export const getAcceptedLoansApi = async (
  api: AxiosInstance,
): Promise<GetAcceptedLoansResponseApi> => {
  const { data } = await api.request<
    GetAcceptedLoansResponseApi,
    AxiosResponse<GetAcceptedLoansResponseApi>
  >({
    method: 'get',
    url: `/loans/acceptedloans`,
  });

  return data;
};
