import {RefreshResponse, RefreshRequest} from "./apiTypes";
import {RefreshRequestApi, RefreshResponseApi} from "./apiTypes.server";

export function mapRequest(
    request: RefreshRequestApi,
): RefreshRequest {
    return {
        refresh_token: request.refresh_token,
    };
}

export function mapResponse(
    responseApi: RefreshResponseApi,
): RefreshResponse {
    return {
        token: responseApi.token,
        refresh: responseApi.refresh
    };
}
