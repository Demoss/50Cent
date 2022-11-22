import { RegisterInvestorStripeResponseApi } from './apiTypes.server';
import { RegisterInvestorStripeResponse } from './apiTypes';

export function mapResponse(
  response: RegisterInvestorStripeResponse,
): RegisterInvestorStripeResponseApi {
  return {
    url: response.url,
  };
}
