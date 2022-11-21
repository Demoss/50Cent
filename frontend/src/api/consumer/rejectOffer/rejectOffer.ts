import { GetApiFunc } from '@/api/base';
import { RejectOfferResponse } from './apiTypes';
import { RejectOfferRequestApi } from './apiTypes.server';
import { mapRequest, mapResponse } from './mappers';
import { rejectOfferApi } from './rejectOffer.api';

export const rejectOffer = async (
  getApi: GetApiFunc,
  request: RejectOfferRequestApi,
): Promise<RejectOfferResponse> => {
  const requestApi = mapRequest(request);
  const api = await getApi();

  return await rejectOfferApi(api, requestApi).then(mapResponse);
};
