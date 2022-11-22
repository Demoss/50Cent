import { AxiosInstance, AxiosResponse } from 'axios';

import { PaymentCompleteResponseApi } from './apiTypes.server';

export const addPaymentCompleteApi = async (
  api: AxiosInstance,
): Promise<PaymentCompleteResponseApi> => {
  const { data } = await api.request<
    unknown,
    AxiosResponse<PaymentCompleteResponseApi>
  >({
    method: 'get',
    url: '/auth/registration/addPayment/complete',
  });

  return data;
};
