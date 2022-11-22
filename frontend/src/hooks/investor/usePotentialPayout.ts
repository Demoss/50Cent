import { Api } from '@/api';
import { useQuery } from 'react-query';

export const usePotentialPayout = () => {
  const { data } = useQuery('payouts', async () => {
    return await Api.getPotentialPayout();
  });

  return {
    payout: data,
  };
};
