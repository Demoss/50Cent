import { RegisterStripeResponseApi } from './apiTypes.server';
import { RegisterStripeResponse } from './apiTypes';

export function mapResponse(
  response: RegisterStripeResponse,
): RegisterStripeResponseApi {
  return {
    url: response.url,
  };
}
