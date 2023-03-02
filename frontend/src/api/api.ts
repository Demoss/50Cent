import { appStorage } from '@/services/appStorage';

import { createAxiosInstance, GetApiFunc } from './base';
import { createAuthApi } from './auth';
import { createInvestorApi } from './investor';
import {
  createConsumerApi,
  createAcceptedLoanApi,
  createCounterOffersApi,
} from './consumer';
import { createCreditApi } from './credit';
import { createAdminApi } from '@/api/admin/adminApi';
// import { createAcceptedLoanApi } from './consumer/consumerApi';

function createApi(getAxiosInstance: GetApiFunc) {
  return {
    ...createAuthApi(getAxiosInstance),
    ...createInvestorApi(getAxiosInstance),
    ...createConsumerApi(getAxiosInstance),
    ...createCreditApi(getAxiosInstance),
    ...createAdminApi(getAxiosInstance),
    ...createAcceptedLoanApi(getAxiosInstance),
    ...createCounterOffersApi(getAxiosInstance),
  };
}

export const Api = createApi(async () => {
  const apiToken = (await appStorage.getApiToken()) || '';
  const baseURL = `http://localhost:8000/api/v1`;

  return createAxiosInstance({ apiToken, baseURL });
});
