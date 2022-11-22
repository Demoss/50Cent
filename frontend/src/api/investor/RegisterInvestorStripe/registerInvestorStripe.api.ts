import { AxiosInstance, AxiosResponse } from 'axios';

import { RegisterInvestorStripeResponseApi } from './apiTypes.server';

export const registerInvestorStripeApi = async (
  api: AxiosInstance,
): Promise<RegisterInvestorStripeResponseApi> => {
  const { data } = await api.request<
    unknown,
    AxiosResponse<RegisterInvestorStripeResponseApi>
  >({
    method: 'post',
    url: '/auth/registration/investor/addPayment',
    data: {},
  });

  return data;
};
