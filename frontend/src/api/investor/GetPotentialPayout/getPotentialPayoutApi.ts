import { AxiosInstance, AxiosResponse } from 'axios';

import { PayoutResponse } from './apiTypes';

export const getPotentialPayoutApi = async (
  api: AxiosInstance,
): Promise<PayoutResponse> => {
  const { data } = await api.request<void, AxiosResponse<PayoutResponse>>({
    method: 'get',
    url: `/investors/payouts`,
  });

  return data;
};
