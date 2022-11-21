import {
  mapRequest,
  mapResponse,
} from '@/api/investor/GetInvestorInfo/mappers';
import { GetApiFunc } from '@/api/base';
import { getInvestorInfoApi } from './getInvestorInfo.api';
import { GetInvestorInfoRequest, GetInvestorInfoResponse } from './apiTypes';

export const getInvestorInfo = async (
  getApi: GetApiFunc,
  request: GetInvestorInfoRequest,
): Promise<GetInvestorInfoResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return getInvestorInfoApi(api, requestApi).then(mapResponse);
};
