import { AxiosInstance, AxiosResponse } from 'axios';

import {
    RefreshRequestApi,
 RefreshResponseApi,
} from './apiTypes.server';

export const refreshApi = async (
    api: AxiosInstance,
    requestApi: RefreshRequestApi,
): Promise<RefreshResponseApi> => {
    const { data } = await api.request<
        RefreshRequestApi,
        AxiosResponse<RefreshResponseApi>
    >({
        method: 'post',
        url: `/auth/refresh`,
        data: requestApi,
    });

    return data;
};
