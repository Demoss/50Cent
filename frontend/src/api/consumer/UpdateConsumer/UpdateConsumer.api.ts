import { RcFile } from 'antd/lib/upload';
import { AxiosInstance, AxiosResponse } from 'axios';
import {
  UpdateConsumerRequestApi,
  UpdateConsumerResponseApi,
} from './apiTypes.server';

export const updateConsumerApi = async (
  api: AxiosInstance,
  requestApi: UpdateConsumerRequestApi,
): Promise<UpdateConsumerResponseApi> => {
  const form = new FormData();
  form.append('name', requestApi.name);
  form.append('surname', requestApi.surname);
  form.append('middleName', requestApi.middle_name);
  form.append('photo', requestApi.photo as RcFile);
  form.append('idFile', requestApi.id_file as RcFile);

  const { data } = await api.request<
    UpdateConsumerRequestApi,
    AxiosResponse<UpdateConsumerResponseApi>
  >({
    method: 'post',
    url: `/consumers/update/${requestApi.id}`,
    data: requestApi,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
