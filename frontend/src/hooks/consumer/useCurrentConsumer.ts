import { useQuery } from 'react-query';

import { Api } from '@/api';

export const useCurrentConsumer = () => {
  const { data } = useQuery('currentConsumer', async () => {
    return await Api.getCurrentConsumer();
  });

  return {
    Name: data?.Name,
    Surname: data?.Surname,
    MiddleName: data?.MiddleName,
    UserEmail: data?.UserEmail,
    Balance: data?.Balance,
    Role: data?.Role,
  };
};
