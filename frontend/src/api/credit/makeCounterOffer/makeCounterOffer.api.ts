import { AxiosInstance, AxiosResponse } from 'axios';
import {
  GetCounterOfferResponseApi,
  MakeCounterOfferRequestApi,
} from './apiTypes.server';

export const makeCounterOfferApi = async (
  api: AxiosInstance,
  requestApi: MakeCounterOfferRequestApi,
): Promise<GetCounterOfferResponseApi> => {
  const { data } = await api.request<
    MakeCounterOfferRequestApi,
    AxiosResponse<GetCounterOfferResponseApi>
  >({
    method: 'post',
    url: `/loans/${requestApi.creditId}/counteroffers`,
    data: requestApi,
  });

  return data;
};
