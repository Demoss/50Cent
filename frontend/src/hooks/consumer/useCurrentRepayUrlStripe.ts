import { Api, ApiTypes } from '@/api';
import { useMutation, useQueryClient } from 'react-query';
import { cacheKeys } from './consumer.cacheKeys';

export const useCurrentRepayUrlStripe = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data: ApiTypes.GetRepayUrlRequest) => {
      return await Api.getRepayStripeUrl(data);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(cacheKeys.currentUser());
      },
    },
  );
  return mutation;
};
