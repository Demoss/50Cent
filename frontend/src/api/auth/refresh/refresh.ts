import {RefreshRequest, RefreshResponse} from './apiTypes';
import { mapRequest, mapResponse } from './mappers';
import { GetApiFunc } from '../../base';
import {refreshApi} from "@/api/auth/refresh/refresh.api";

export const refresh = async (
    getApi: GetApiFunc,
    request: RefreshRequest,
): Promise<RefreshResponse> => {
    const api = await getApi();
    const requestApi = mapRequest(request);

    return refreshApi(api, requestApi).then(mapResponse);
};
