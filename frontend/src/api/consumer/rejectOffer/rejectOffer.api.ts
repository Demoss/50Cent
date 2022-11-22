import { AxiosInstance, AxiosResponse } from 'axios';
import {
  RejectOfferRequestApi,
  RejectOfferResponseApi,
} from './apiTypes.server';

export const rejectOfferApi = async (
  api: AxiosInstance,
  requestApi: RejectOfferRequestApi,
): Promise<RejectOfferResponseApi> => {
  const { data } = await api.request<
    RejectOfferRequestApi,
    AxiosResponse<RejectOfferResponseApi>
  >({
    method: 'post',
    url: `/counteroffers/${requestApi.id}/reject`,
  });

  return data;
};
