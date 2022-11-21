import { useMutation, useQueryClient } from 'react-query';
import { Api, ApiTypes } from '@/api';
import { cacheKeys } from '../auth/auth.cacheKeys';

export const useCurrentURLStripe = (id: string | undefined) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (data: ApiTypes.GetStripeURLRequest) => {
      return await Api.getStripeURL(data);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(cacheKeys.currentUser());
      },
    },
  );
  return mutation;
};
