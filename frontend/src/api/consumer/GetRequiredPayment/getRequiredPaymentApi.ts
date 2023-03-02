import { AxiosInstance, AxiosResponse } from 'axios';

import { PaymentResponse } from './apiTypes';

export const getRequiredPaymentApi = async (
  api: AxiosInstance,
): Promise<PaymentResponse> => {
  const { data } = await api.request<void, AxiosResponse<PaymentResponse>>({
    method: 'get',
    url: `/consumers/payments`,
  });

  return data;
};
