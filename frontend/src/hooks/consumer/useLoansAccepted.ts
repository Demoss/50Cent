import { useQuery } from 'react-query';
import { Api } from '@/api';

import { Loans } from '@/api/consumer';

const emptyLoans: Loans[] = [];

export const useLoansAccepted = () => {
  const { data, ...meta } = useQuery('loans', Api.getAcceptedLoans);

  return {
    loans: data || emptyLoans,
    ...meta,
  };
};
