import { GetApiFunc } from '@/api/base';
import { PaymentResponse, Payments } from './apiTypes';
import { getRequiredPaymentApi } from './getRequiredPaymentApi';

import { mapResponse } from './mappers';

export const getRequiredPayment = async (
  getApi: GetApiFunc,
): Promise<Payments> => {
  const api = await getApi();

  return await getRequiredPaymentApi(api).then(mapResponse);
};
