import { AxiosInstance, AxiosResponse } from 'axios';

import { PaymentResponse, Payments } from './apiTypes';
import { PaymentArr } from './apiTypes.server';

export const getRequiredPaymentApi = async (
  api: AxiosInstance,
): Promise<Payments> => {
  const { data } = await api.request<void, AxiosResponse<PaymentArr>>({
    method: 'get',
    url: `/consumers/payments`,
  });

  return data;
};
