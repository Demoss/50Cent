import { AxiosInstance, AxiosResponse } from 'axios';

import { InvestorModelResponse } from './apiTypes';

export const getCurrentInvestorApi = async (
  api: AxiosInstance,
): Promise<InvestorModelResponse> => {
  const { data } = await api.request<
    void,
    AxiosResponse<InvestorModelResponse>
  >({
    method: 'get',
    url: `/investors/currentInvestor`,
  });

  return data;
};
