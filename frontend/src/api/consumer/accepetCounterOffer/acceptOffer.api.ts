import { AxiosInstance, AxiosResponse } from 'axios';
import {
  AcceptOfferRequestApi,
  AcceptOfferResponseApi,
} from './apiTypes.server';

export const acceptOfferApi = async (
  api: AxiosInstance,
  requestApi: AcceptOfferRequestApi,
): Promise<AcceptOfferResponseApi> => {
  const { data } = await api.request<
    AcceptOfferRequestApi,
    AxiosResponse<AcceptOfferResponseApi>
  >({
    method: 'post',
    url: `/loans/counteroffers/${requestApi.id}/accept`,
  });

  return data;
};
