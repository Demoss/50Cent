import { GetApiFunc } from '@/api/base';
import { CounterOffers } from './apiTypes';
import { mapCounterOffers } from './mappers';
import { getCounterOffersApi } from './getCounterOffers.api';

export const getCounterOffers = async (
  getApi: GetApiFunc,
): Promise<CounterOffers[]> => {
  const api = await getApi();
  return getCounterOffersApi(api).then((data) => {
    return mapCounterOffers(data);
  });
};
