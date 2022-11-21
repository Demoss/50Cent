import { AxiosInstance, AxiosResponse } from 'axios';

import { InvestorLoanApi } from './apiTypes.server';

export const getAllInvestorCreditsApi = async (
  api: AxiosInstance,
): Promise<InvestorLoanApi> => {
  const { data } = await api.request<void, AxiosResponse<InvestorLoanApi>>({
    method: 'get',
    url: `/investors/loans`,
  });

  return data;
};
