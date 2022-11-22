import { RejectOfferRequest, RejectOfferResponse } from './apiTypes';
import {
  RejectOfferRequestApi,
  RejectOfferResponseApi,
} from './apiTypes.server';

export function mapRequest(request: RejectOfferRequest): RejectOfferRequestApi {
  return {
    id: request.id,
  };
}

export function mapResponse(
  response: RejectOfferResponse,
): RejectOfferResponseApi {
  return {
    status: response.status,
  };
}
