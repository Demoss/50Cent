import { Api } from '@/api';
import { useQuery } from 'react-query';

export const useInvestorCredits = () => {
  const { data } = useQuery('investorLoans', async () => {
    return await Api.getAllInvestorCredits();
  });

  return {
    data: data?.data,
  };
};
