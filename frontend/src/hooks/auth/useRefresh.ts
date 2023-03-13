import { Api } from '@/api';
import { useQuery } from 'react-query';

export const useRefresh= (token: string) => {
    const { data } = useQuery('userRefresh', async () => {
        return await Api.refresh({refresh_token: token});
    });
    return { token: data?.token };
};
