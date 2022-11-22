import { GetApiFunc } from '@/api/base';
import { acceptOfferApi } from './acceptOffer.api';
import { AcceptOfferResponse } from './apiTypes';
import { AcceptOfferRequestApi } from './apiTypes.server';
import { mapRequest, mapResponse } from './mappers';

export const acceptOffer = async (
  getApi: GetApiFunc,
  request: AcceptOfferRequestApi,
): Promise<AcceptOfferResponse> => {
  const requestApi = mapRequest(request);
  const api = await getApi();

  return await acceptOfferApi(api, requestApi).then(mapResponse);
};
