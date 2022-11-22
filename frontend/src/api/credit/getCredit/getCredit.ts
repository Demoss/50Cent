import { GetCreditResponse } from '@/api/credit/getCredit/apiTypes';
import { GetApiFunc } from '@/api/base';
import { getCreditApi } from '@/api/credit/getCredit/getCredit.api';
import { mapRequest, mapResponse } from '@/api/credit/getCredit/mappers';
import { GetCreditRequestApi } from '@/api/credit/getCredit/apiTypes.server';

export const getCredit = async (
  getApi: GetApiFunc,
  request: GetCreditRequestApi,
): Promise<GetCreditResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return getCreditApi(api, requestApi).then(mapResponse);
};
