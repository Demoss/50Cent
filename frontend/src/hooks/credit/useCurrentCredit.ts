import { useQuery } from 'react-query';
import { Api } from '@/api';

export const useCurrentCredit = (id: string | undefined) => {
  return useQuery('currentCredit', () => {
    return Api.getCredit({ creditId: id });
  });
};
