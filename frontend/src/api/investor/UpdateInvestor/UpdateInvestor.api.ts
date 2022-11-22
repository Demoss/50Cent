import { RcFile } from 'antd/lib/upload';
import { AxiosInstance, AxiosResponse } from 'axios';
import {
  UpdateInvestorRequestApi,
  UpdateInvestorResponseApi,
} from './apiTypes.server';

export const updateInvestorApi = async (
  api: AxiosInstance,
  requestApi: UpdateInvestorRequestApi,
): Promise<UpdateInvestorResponseApi> => {
  const form = new FormData();
  form.append('name', requestApi.name);
  form.append('surname', requestApi.surname);
  form.append('middleName', requestApi.middle_name);
  form.append('photo', requestApi.photo as RcFile);
  form.append('idFile', requestApi.id_file as RcFile);

  const { data } = await api.request<
    UpdateInvestorRequestApi,
    AxiosResponse<UpdateInvestorResponseApi>
  >({
    method: 'post',
    url: `/investors/update/${requestApi.id}`,
    data: requestApi,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
