import { registerInvestorStripeApi } from '@/api/investor/RegisterInvestorStripe/registerInvestorStripe.api';
import { RegisterInvestorStripeResponse } from './apiTypes';
import { GetApiFunc } from '@/api/base';
import { mapResponse } from './mappers';

export const registerInvestorStripe = async (
  getApi: GetApiFunc,
): Promise<RegisterInvestorStripeResponse> => {
  const api = await getApi();

  return await registerInvestorStripeApi(api).then(mapResponse);
};
