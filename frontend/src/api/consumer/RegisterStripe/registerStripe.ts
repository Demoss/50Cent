import { registerStripeApi } from '@/api/consumer/RegisterStripe/registerStripe.api';
import { RegisterStripeResponse } from './apiTypes';
import { GetApiFunc } from '@/api/base';
import { mapResponse } from './mappers';

export const registerStripe = async (
  getApi: GetApiFunc,
): Promise<RegisterStripeResponse> => {
  const api = await getApi();

  return await registerStripeApi(api).then(mapResponse);
};
