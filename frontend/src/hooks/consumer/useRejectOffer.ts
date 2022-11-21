import { Api, ApiTypes } from '@/api';
import { useMutation } from 'react-query';

export const useRejectOffer = () => {
  const mutation = useMutation(async (data: ApiTypes.RejectOfferRequest) => {
    return await Api.rejectCounterOffer(data);
  });
  return mutation;
};
