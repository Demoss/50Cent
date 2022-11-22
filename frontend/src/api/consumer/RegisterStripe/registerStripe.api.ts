import { AxiosInstance, AxiosResponse } from 'axios';

import { RegisterStripeResponseApi } from './apiTypes.server';

export const registerStripeApi = async (
  api: AxiosInstance,
): Promise<RegisterStripeResponseApi> => {
  const { data } = await api.request<
    unknown,
    AxiosResponse<RegisterStripeResponseApi>
  >({
    method: 'post',
    url: '/auth/registration/consumer/addPayment',
    data: {},
  });

  return data;
};
