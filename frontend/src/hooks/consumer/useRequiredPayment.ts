import { Api } from '@/api';
import { useQuery } from 'react-query';

export const useRequiredPayment = () => {
  const { data } = useQuery('payouts', async () => {
    return await Api.getRequiredPayment();
  });

  return {
    payment: data,
  };
};
