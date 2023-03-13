export interface RefreshRequestApi {
    refresh_token: string;
}

export interface RefreshResponseApi {
    token: string;
    refresh: string;
}
