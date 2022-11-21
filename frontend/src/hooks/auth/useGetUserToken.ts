import { Api } from '@/api';
import { useQuery } from 'react-query';

export const useGetUserToken = () => {
  const { data } = useQuery('userToken', async () => {
    return await Api.addPaymentComplete();
  });
  return { token: data?.token };
};
