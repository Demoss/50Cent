import { useQuery } from 'react-query';

import { Api } from '@/api';

export const useCurrentInvestor = () => {
  const { data } = useQuery('currentInvestor', async () => {
    return await Api.getCurrentInvestor();
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
