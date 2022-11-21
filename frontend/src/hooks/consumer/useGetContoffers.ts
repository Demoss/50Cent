import { useQuery } from 'react-query';
import { Api } from '@/api';
import { CounterOffers } from '@/api/consumer/getCounterOffers/apiTypes';

const emptyLoans: CounterOffers[] = [];

export const useCounterOffers = () => {
  const { data, ...meta } = useQuery('counteroffers', Api.getCounterOffers);

  return {
    offers: data || emptyLoans,
    ...meta,
  };
};
