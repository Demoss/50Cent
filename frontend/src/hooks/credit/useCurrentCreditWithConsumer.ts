import { useQuery } from 'react-query';
import { Api } from '@/api';

export const useCurrentCreditWithConsumer = (id: string | undefined) => {
  return useQuery('currentCreditWithConsumer', () => {
    return Api.getCreditWithConsumer({ creditId: id });
  });
};
