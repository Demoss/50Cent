export type AppStorageSchema = {
  apiToken?: string;
  apiRefresh?: string;
  apiExpiration?: string;
};

class AppStorage {
  private async get(
    key: keyof AppStorageSchema,
  ): Promise<AppStorageSchema[keyof AppStorageSchema] | undefined> {
    return localStorage.getItem(
      key as string,
    ) as unknown as AppStorageSchema[keyof AppStorageSchema];
  }

  private async set(
    key: keyof AppStorageSchema,
    value: AppStorageSchema[keyof AppStorageSchema],
  ): Promise<void> {
    localStorage.setItem(key as string, value as unknown as string);
  }

  async getApiToken(): Promise<string> {
    return (await this.get('apiToken')) || '';
  }
  async getApiRefresh(): Promise<string> {
    return (await this.get('apiRefresh')) || '';
  }
  async getApiExpiration(): Promise<string>{
    return (await this.get('apiExpiration')) || '';
  }
  async setApiKey(apiToken: string) {
    return await this.set('apiToken', apiToken);
  }
  async setRefreshToken(apiRefresh: string) {
    return await this.set('apiRefresh', apiRefresh);
  }
  async setExpirationTimeApiKey(Expiration: string) {
    return await this.set('apiExpiration', Expiration);
  }
}

export const appStorage = new AppStorage();
