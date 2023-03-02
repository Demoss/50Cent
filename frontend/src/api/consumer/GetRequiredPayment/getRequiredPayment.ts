import { GetApiFunc } from '@/api/base';
import { PaymentResponse } from './apiTypes';
import { getRequiredPaymentApi } from './getRequiredPaymentApi';

import { mapResponse } from './mappers';

export const getRequiredPayment = async (
  getApi: GetApiFunc,
): Promise<PaymentResponse> => {
  const api = await getApi();

  return await getRequiredPaymentApi(api).then(mapResponse);
};
