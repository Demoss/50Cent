import { mapRequest, mapResponse } from '@/api/investor/UpdateInvestor/mappers';
import { GetApiFunc } from '@/api/base';
import { UpdateInvestorRequest, UpdateInvestorResponse } from './apiTypes';
import { updateInvestorApi } from './UpdateInvestor.api';

export const updateInvestor = async (
  getApi: GetApiFunc,
  request: UpdateInvestorRequest,
): Promise<UpdateInvestorResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return updateInvestorApi(api, requestApi).then(mapResponse);
};
