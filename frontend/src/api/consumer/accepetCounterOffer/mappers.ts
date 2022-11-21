import { AcceptOfferRequest, AcceptOfferResponse } from './apiTypes';
import {
  AcceptOfferRequestApi,
  AcceptOfferResponseApi,
} from './apiTypes.server';

export function mapRequest(request: AcceptOfferRequest): AcceptOfferRequestApi {
  return {
    id: request.id,
  };
}

export function mapResponse(
  response: AcceptOfferResponse,
): AcceptOfferResponseApi {
  return {
    status: response.status,
  };
}
