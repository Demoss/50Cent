import { Api, ApiTypes } from '@/api';
import { useMutation } from 'react-query';

export const useAcceptOffer = () => {
  const mutation = useMutation(async (data: ApiTypes.AcceptOfferRequest) => {
    return await Api.acceptCounterOffer(data);
  });
  return mutation;
};
