export interface RefreshRequest {
    refresh_token: string;
}

export interface RefreshResponse {
    token: string;
    refresh: string;
}
