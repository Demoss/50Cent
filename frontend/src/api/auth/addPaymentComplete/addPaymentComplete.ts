import { GetApiFunc } from '@/api/base';
import { PaymentCompleteResponse } from './apiTypes';
import { mapResponse } from './mappers';
import { addPaymentCompleteApi } from './addPaymentComplete.api';

export const addPaymentComplete = async (
  getApi: GetApiFunc,
): Promise<PaymentCompleteResponse> => {
  const api = await getApi();

  return await addPaymentCompleteApi(api).then(mapResponse);
};
