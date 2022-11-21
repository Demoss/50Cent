import { GetApiFunc } from '@/api/base';
import {
  GetCounterOfferResponse,
  MakeCounterOfferRequest,
} from '@/api/credit/makeCounterOffer/apiTypes';
import { makeCounterOfferApi } from './makeCounterOffer.api';
import { mapRequest, mapResponse } from '@/api/credit/makeCounterOffer/mappers';

export const makeCounterOffer = async (
  getApi: GetApiFunc,
  request: MakeCounterOfferRequest,
): Promise<GetCounterOfferResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return makeCounterOfferApi(api, requestApi).then(mapResponse);
};
